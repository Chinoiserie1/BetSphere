// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// const categories = [
//   {
//     name: "Sports",
//     subCategories: [
//       {
//         name: "Football",
//         selections: [
//           {
//             name: "Europa League",
//             slug: "europa-league",
//             urls: [
//               {
//                 url: "https://api-football-v1.p.rapidapi.com/v3/fixtures?league=3&season=2024",
//                 name: "Fixtures",
//                 headers: {
//                   "x-rapidapi-key":
//                     "20288f0921mshf5460e176789bebp1e93cfjsn958b4d005283",
//                   "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//                 },
//               },
//             ],
//           },
//           {
//             name: "France League 1",
//             slug: "france-league-1",
//           },
//         ],
//       },
//       {
//         name: "Tennis",
//         selections: [
//           {
//             name: "Wimbledon",
//             slug: "wimbledon",
//           },
//           {
//             name: "US Open",
//             slug: "us-open",
//           },
//           {
//             name: "Australian Open",
//             slug: "australian-open",
//           },
//           {
//             name: "Roland Garros",
//             slug: "roland-garros",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "ESports",
//     subCategories: [
//       {
//         name: "League of Legends",
//         selections: [
//           {
//             name: "Selection 5",
//             slug: "selection-5",
//           },
//           {
//             name: "Selection 6",
//             slug: "selection-6",
//           },
//         ],
//       },
//       {
//         name: "Counter Strike",
//         selections: [
//           {
//             name: "Selection 7",
//             slug: "selection-7",
//           },
//           {
//             name: "Selection 8",
//             slug: "selection-8",
//           },
//         ],
//       },
//     ],
//   },
// ];

// async function main() {
//   for (const category of categories) {
//     const createdCategory = await prisma.category.upsert({
//       where: { name: category.name },
//       update: {},
//       create: { name: category.name },
//     });

//     for (const subCategory of category.subCategories) {
//       const createdSubCategory = await prisma.subCategory.upsert({
//         where: { name: subCategory.name },
//         update: { categoryId: createdCategory.id },
//         create: {
//           name: subCategory.name,
//           categoryId: createdCategory.id,
//         },
//       });

//       for (const selection of subCategory.selections) {
//         const createdSelection = await prisma.selection.upsert({
//           where: { slug: selection.slug },
//           update: { subCategoryId: createdSubCategory.id },
//           create: {
//             name: selection.name,
//             slug: selection.slug,
//             subCategoryId: createdSubCategory.id,
//           },
//         });

//         for (const url of selection?.urls ?? []) {
//           await prisma.url.create({
//             data: {
//               url: url.url,
//               name: url.name,
//               selectionId: createdSelection.id,
//               headers: url.headers,
//             },
//           });
//         }
//       }
//     }
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
