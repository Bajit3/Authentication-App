import { NextResponse } from "next/server";
import { connectToDatabase } from "../../db";
import bcrypt from 'bcryptjs';
import { getToken, verifyJwtToken } from "../../jwtHelper";

export async function POST(request, res) {
    const { db } = await connectToDatabase()
    const User = db.collection("users");
    try {
        const body = await request.json()
        const { email, password, inputToken } = body;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
        let token = null;
        try {
            token = await getToken(user._id);
            const isValid = await verifyJwtToken(inputToken)
        } catch (e) {
            console.log(e)
        }
        return NextResponse.json({ message: "Login successfull", accessToken: token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Login Failed, Invalid credentials!" }, { status: 401 });
    }
}