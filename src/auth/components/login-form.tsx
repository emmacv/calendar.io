import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { auth, provider } from '@/lib/firebase';
import { Label } from '@radix-ui/react-label';
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { Chrome, Facebook } from 'lucide-react';

const LoginForm = () => {
  const { logIn } = useAuth();

  const authWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth(), provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const { user } = result;
      // IdP data available using getAdditionalUserInfo(result)
      const additionalUserInfo = getAdditionalUserInfo(result);

      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        isNewUser: additionalUserInfo?.isNewUser ?? false,
      };

      logIn(userInfo);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  return (
    <form className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-rubik">Calendar.io</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email to sign in to your account.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full" onClick={authWithGoogle}>
            <Chrome className="h-4 w-4" />
            <span className="sr-only">Login with Google</span>
          </Button>
          <Button variant="outline" className="w-full">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Login with GitHub</span>
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
