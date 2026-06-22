const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.location.deleteMany({});
  const indonesia = await prisma.location.create({
    data: { location_level: 0, location_code: "ID", name: "Indonesia", latitude: -0.7893, longitude: 113.9213, is_active: true },
  });
  const provinces = [
    ["ID-AC","Aceh",4.6951,96.7494],["ID-SU","Sumatera Utara",2.1154,99.5451],
    ["ID-SB","Sumatera Barat",-0.7399,100.8000],["ID-RI","Riau",0.2933,101.7068],
    ["ID-KR","Kepulauan Riau",0.8700,104.4200],["ID-JA","Jambi",-1.4852,102.4381],
    ["ID-SS","Sumatera Selatan",-3.3194,103.9144],["ID-BB","Bangka Belitung",-2.7411,106.4406],
    ["ID-BE","Bengkulu",-3.7928,102.2608],["ID-LA","Lampung",-4.5586,105.4068],
    ["ID-BT","Banten",-6.4058,106.0640],["ID-JK","DKI Jakarta",-6.2088,106.8456],
    ["ID-JB","Jawa Barat",-6.9147,107.6098],["ID-JT","Jawa Tengah",-7.1509,110.1403],
    ["ID-YO","DI Yogyakarta",-7.7956,110.3695],["ID-JI","Jawa Timur",-7.5361,112.2384],
    ["ID-BA","Bali",-8.4095,115.1889],["ID-NB","Nusa Tenggara Barat",-8.6529,117.3616],
    ["ID-NT","Nusa Tenggara Timur",-8.6539,121.0755],["ID-KB","Kalimantan Barat",-0.2788,111.4753],
    ["ID-KT","Kalimantan Tengah",-1.6815,113.3824],["ID-KS","Kalimantan Selatan",-3.0926,115.2838],
    ["ID-KI","Kalimantan Timur",1.6406,116.4194],["ID-KU","Kalimantan Utara",2.7259,116.9110],
    ["ID-SA","Sulawesi Utara",1.4888,124.8401],["ID-ST","Sulawesi Tengah",-1.4300,121.4456],
    ["ID-SR","Sulawesi Barat",-2.8441,119.2321],["ID-SN","Sulawesi Selatan",-4.3105,120.2092],
    ["ID-SG","Sulawesi Tenggara",-4.1449,122.1746],["ID-GO","Gorontalo",0.5435,123.0568],
    ["ID-MA","Maluku",-3.2385,130.1453],["ID-MU","Maluku Utara",1.5700,127.8088],
    ["ID-PB","Papua Barat",-1.3361,133.1747],["ID-PD","Papua Barat Daya",-0.8700,131.2500],
    ["ID-PA","Papua",-4.2699,138.0804],["ID-PT","Papua Tengah",-3.6000,136.0000],
    ["ID-PE","Papua Pegunungan",-4.0000,139.0000],["ID-PS","Papua Selatan",-6.5000,140.3000],
  ];
  for (const [code, name, lat, lng] of provinces) {
    await prisma.location.create({
      data: { parent_id: indonesia.id, location_level: 1, location_code: code, name, latitude: lat, longitude: lng, is_active: true },
    });
  }
  console.log(`Created ${provinces.length} provinces`);
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1) });
