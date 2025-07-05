export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 bg-black border-b border-neutral-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Akhilesh</h1>
        <ul className="flex space-x-4">
          <li><a href="#projects" className="hover:underline">Projects</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
