export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-8">
      <main className="flex-1 max-w-5xl mx-auto w-full flex flex-col gap-8 items-center">
        <div className="text-center mt-16">
          <h1 className="text-4xl font-bold mb-4">Real-time Collaboration Platform</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Create, edit and collaborate on documents in real-time with your team
          </p>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row w-full max-w-md justify-center">
          <a
            href="/docs"
            className="rounded-lg bg-foreground text-background px-6 py-3 text-center font-medium hover:bg-opacity-90 transition-colors"
          >
            Create New Document
          </a>
          <a
            href="/docs"
            className="rounded-lg border border-foreground/10 px-6 py-3 text-center font-medium hover:bg-foreground/5 transition-colors"
          >
            Open Documents
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          <div className="p-6 rounded-lg border border-foreground/10">
            <h3 className="font-semibold mb-2">Real-time Editing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              See changes as they happen with instant synchronization across all users
            </p>
          </div>

          <div className="p-6 rounded-lg border border-foreground/10">
            <h3 className="font-semibold mb-2">Team Collaboration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Work together seamlessly with your team members in real-time
            </p>
          </div>

          <div className="p-6 rounded-lg border border-foreground/10">
            <h3 className="font-semibold mb-2">Version History</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Track changes and restore previous versions of your documents
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-foreground/10 py-8">
        <div className="max-w-5xl mx-auto flex justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
          <a href="#" className="hover:text-foreground">About</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </footer>
    </div>
  );
}
