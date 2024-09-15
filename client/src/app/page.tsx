import Link from 'next/link';

export default function Home() {
  return (
    <section className="bg-blue-600 text-white h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Manage Your Projects Effortlessly</h1>
        <p className="text-lg mb-8 max-w-lg mx-auto">
          Organize, track, and complete your personal projects with ease. Our powerful project management app keeps
          everything at your fingertips.
        </p>
        <div>
          <Link href="/projects" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
            My Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
