import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { auth0: string[] } }) {
  const { pathname } = new URL(req.url);
  
  // Extract the Auth0 route part
  const auth0Route = params.auth0.join('/');
  
  // Handle different Auth0 routes
  if (auth0Route === 'callback') {
    return handleCallback(req);
  }
  
  if (auth0Route === 'login') {
    return handleLogin(req);
  }
  
  if (auth0Route === 'logout') {
    return handleLogout(req);
  }
  
  // Default response
  return NextResponse.json(
    { error: 'Unknown Auth0 route' },
    { status: 404 }
  );
}

// Handle Auth0 callback
async function handleCallback(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  
  // Get the state parameter (which contains the return URL)
  const state = searchParams.get('state') || '/';
  
  // Redirect to the callback page
  return NextResponse.redirect(new URL('/auth/callback', url.origin));
}

// Handle Auth0 login
async function handleLogin(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  
  // Get the return_to parameter if it exists
  const returnTo = searchParams.get('return_to') || '/';
  
  // Redirect to the callback with some test parameters
  return NextResponse.redirect(new URL(`/auth/callback?code=test_code&state=${encodeURIComponent(returnTo)}`, url.origin));
}

// Handle Auth0 logout
async function handleLogout(req: NextRequest) {
  // Clear any auth cookies here
  
  // Redirect to the home page
  return NextResponse.redirect(new URL('/', req.url));
} 