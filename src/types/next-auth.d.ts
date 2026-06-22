import { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      full_name: string
      email: string
      image: string | null
      organization_id: string | null
      organization_name: string | null
      organization_logo: string | null
      roles: string[]
      permissions: string[]
      is_active: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    full_name: string
    image: string | null
    organization_id: string | null
    organization_name: string | null
    organization_logo: string | null
    roles: string[]
    permissions: string[]
    is_active: boolean
  }
}
