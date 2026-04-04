import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-2xl mx-auto mb-3">
          ☕
        </div>
        <h1 className="font-serif text-2xl font-bold text-primary">Ende Bete</h1>
        <p className="text-muted-foreground text-sm mt-1">Create your account</p>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-warm-lg border-0',
            headerTitle: 'font-serif text-primary',
            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
            footerActionLink: 'text-primary hover:text-primary/80',
            logoImage: { display: 'none' },
            socialButtonsBlockButtonText: 'text-sm',
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
      />
    </div>
  );
}
