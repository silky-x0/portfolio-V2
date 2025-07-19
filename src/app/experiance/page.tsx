import React from "react";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen py-24 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Experience</h1>
      <div className="space-y-8">
        <div className="bg-[#14213d]/60 border border-[#fca311]/20 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#fca311] mb-2">Backend Engineer @ TechCorp</h2>
          <p className="text-[#e5e5e5] mb-1">Jan 2022 - Present</p>
          <ul className="list-disc list-inside text-[#e5e5e5]/90">
            <li>Designed scalable REST APIs and microservices.</li>
            <li>Worked with Node.js, TypeScript, PostgreSQL, and AWS.</li>
            <li>Led a team of 3 engineers for a cloud migration project.</li>
          </ul>
        </div>
        <div className="bg-[#14213d]/60 border border-[#fca311]/20 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#fca311] mb-2">Software Developer @ Webify</h2>
          <p className="text-[#e5e5e5] mb-1">Jul 2020 - Dec 2021</p>
          <ul className="list-disc list-inside text-[#e5e5e5]/90">
            <li>Built and maintained web applications using Next.js and React.</li>
            <li>Implemented CI/CD pipelines and Dockerized deployments.</li>
            <li>Collaborated with designers to improve UX.</li>
          </ul>
        </div>
        <div className="bg-[#14213d]/60 border border-[#fca311]/20 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#fca311] mb-2">Intern @ StartupX</h2>
          <p className="text-[#e5e5e5] mb-1">Jan 2020 - Jun 2020</p>
          <ul className="list-disc list-inside text-[#e5e5e5]/90">
            <li>Assisted in backend development and testing.</li>
            <li>Learned agile methodologies and code reviews.</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 