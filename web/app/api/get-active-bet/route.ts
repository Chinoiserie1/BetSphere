// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function GET(req: NextRequest) {
//   console.log("enter");
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   console.log("id", id);

//   try {
//     const betInfo = await prisma.betInfo.findUnique({
//       where: {
//         id: String(id),
//       },
//     });

//     if (!betInfo) {
//       return NextResponse.json(
//         { message: "BetInfo not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(betInfo);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
