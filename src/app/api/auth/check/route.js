import { NextResponse } from "next/server";
import { verifyJwtToken } from "../../jwtHelper";

export async function GET(request) {
  try {
    const authToken = request.headers?.get("authorization")?.substring(7);
    console.log(authToken)
    const res = await verifyJwtToken(authToken);
    if (res) {
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Error Occured" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 401 });
  }
}
