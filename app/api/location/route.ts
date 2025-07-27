import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   const ip = request.headers.get('x-forwarded-for') || 'visitor';

   try {
     const response = await fetch(`http://ip-api.com/json/${ip}`);
     const data = await response.json();

     return NextResponse.json({
       country: data.country || 'Morocco',
       countryCode: data.countryCode || 'MA'
     });
   } catch (error) {
     return NextResponse.json({
       country: 'Morocco',
       countryCode: 'MA'
     });
   }
}