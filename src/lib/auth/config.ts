import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db/prisma"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            organization: true,
            user_roles: {
              include: {
                role: {
                  include: {
                    role_permissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })

        if (!dbUser || !dbUser.is_active) {
          return token
        }

        const roles = dbUser.user_roles.map((ur) => ur.role.role_name)
        const permissions = dbUser.user_roles.flatMap((ur) =>
          ur.role.role_permissions.map((rp) => rp.permission.permission_code)
        )

        token.id = dbUser.id
        token.full_name = dbUser.full_name
        token.organization_id = dbUser.organization_id
        token.organization_name = dbUser.organization?.name ?? null
        token.roles = roles
        token.permissions = permissions
        token.is_active = dbUser.is_active
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        full_name: token.full_name as string,
        organization_id: (token.organization_id as string) ?? null,
        organization_name: (token.organization_name as string) ?? null,
        roles: (token.roles as string[]) ?? [],
        permissions: (token.permissions as string[]) ?? [],
        is_active: (token.is_active as boolean) ?? true,
      }
      return session
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const pathname = new URL(request.url).pathname

      const publicPaths = ["/", "/login", "/dashboard-publik"]
      const isPublic = publicPaths.some(
        (p) => pathname === p || pathname.startsWith("/api/auth")
      )

      if (isPublic) return true
      if (!isLoggedIn) return false

      return true
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        if (!email || !password) return null

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            organization: true,
            user_roles: {
              include: {
                role: {
                  include: {
                    role_permissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })

        if (!user || !user.is_active) return null

        const isValid = await bcrypt.compare(password, user.password_hash)
        if (!isValid) return null

        await prisma.user.update({
          where: { id: user.id },
          data: { last_login_at: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
        }
      },
    }),
  ],
  trustHost: true,
}
