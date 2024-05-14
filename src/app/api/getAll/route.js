import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../db";
import { validateRequest } from "../jwtHelper";

export async function GET(req) {
  const auth = await validateRequest(req);
  if (auth==null) {
    // req.headers
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { db } = await connectToDatabase();
    const User = db.collection("users");
    const users = await User.find({}).toArray();
    // const users = await User.find({}, { projection: { firstName: 1, lastName: 1, username: 1 } }).toArray();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export default GET;
