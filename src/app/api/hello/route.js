import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../db";

export async function GET(req) {
    return NextResponse.json({message:"Success"}, { status: 200 });
}

export default GET;
