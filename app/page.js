"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaGraduationCap, FaUsers, FaBuilding } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Typewriter } from "react-simple-typewriter";
export default function Home() {
  const [schools, setSchools] = useState([]);
const thoughts = [
    "💭 Thinking about school admission...",
    "📚 Which school is best for me?",
    "📝 How do I apply online?",
  ];

  const [visibleThoughts, setVisibleThoughts] = useState([]);

  useEffect(() => {
    let index = 0;
    let interval;
    let cycleTimeout;

    function startCycle() {
      setVisibleThoughts([]); // reset
      index = 0;

      interval = setInterval(() => {
        setVisibleThoughts((prev) => [...prev, thoughts[index]]);
        index++;

        if (index >= thoughts.length) {
          clearInterval(interval);

          // Wait 3s then restart cycle
          cycleTimeout = setTimeout(() => {
            startCycle();
          }, 3000);
        }
      }, 1000); // show each bubble 1s apart
    }

    startCycle();

    return () => {
      clearInterval(interval);
      clearTimeout(cycleTimeout);
    };
  }, []);
  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data))
      .catch((err) => console.error(err));

    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="flex-grow w-full">

      {/* Hero Section */}
<section className="relative w-full mt-8 flex flex-col md:flex-row min-h-[90vh]">

  {/* LEFT SIDE - Student */}
  <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center bg-white p-6 md:p-8 relative">
    
    {/* Student Image */}
    <img
      src="https://img.freepik.com/vector-premium/ilustracion-nina-pensando-pregunta-nina-llorando-mochila_699917-82.jpg"
      alt="Student Thinking"
      className="w-3/4 md:w-64 h-auto"
    />

    {/* Multiple Thought Bubbles */}
    <div className="flex flex-col md:absolute md:left-[60%] md:top-10 mt-4 md:mt-0 space-y-3">
      {visibleThoughts.map((t, i) => (
        <div
          key={i}
          className="bg-gray-200 shadow-lg rounded-2xl p-3 text-gray-800 animate-fadeInUp"
        >
          {t}
        </div>
      ))}
    </div>
  </div>

  {/* RIGHT SIDE - School Search */}
  <div className="w-full md:w-1/2 flex items-center justify-center p-6">
    <div className="bg-white/90 p-6 rounded-xl shadow-lg w-full md:w-2/3">

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-black text-center">
        Search for Schools
      </h2>

      {/* Search Box with integrated icon */}
      <div className="relative flex">
        <input
          type="text"
          placeholder="Enter school name or location..."
          className="w-full p-3 pr-10 rounded-lg border-2 border-black placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-black animate-shake cursor-pointer" />
      </div>
    </div>
  </div>

</section>


      {/* Features Section */}
<section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-15 text-center">
  {/* Card 1 */}
  <div
    className="p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
    data-aos="fade-up"
  >
    <div className="bg-indigo-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
      <FaGraduationCap className="text-indigo-600 text-4xl" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">Quality Education</h3>
    <pre className="bg-gray-900 text-indigo-400 text-sm text-left p-4 rounded-lg overflow-x-auto font-mono shadow-inner">
<Typewriter
    words={[`Provides a quality education,
Offers a broad range of programs, 
Facilitates collaboration and innovation
through partnerships with local
businesses,research institutions.`]}
    loop={0} // 0 = infinite
    typeSpeed={40}
    deleteSpeed={30}
    delaySpeed={2000} // pause before retyping
  />
    </pre>
  </div>

  {/* Card 2 */}
  <div
    className="p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <div className="bg-green-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
      <FaUsers className="text-green-600 text-4xl" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">Community Driven</h3>
 <pre className="bg-gray-900 text-green-400 text-sm text-left p-4 rounded-lg overflow-x-auto font-mono shadow-inner">
<Typewriter
    words={[`Provides a quality education,
Offers a broad range of programs, 
Facilitates collaboration and innovation
through partnerships with local
businesses,research institutions.`]}
    loop={0} // 0 = infinite
    typeSpeed={40}
    deleteSpeed={30}
    delaySpeed={2000} // pause before retyping
  />
    </pre>
  </div>

  {/* Card 3 */}
  <div
    className="p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
    data-aos="fade-up"
    data-aos-delay="400"
  >
    <div className="bg-blue-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
      <FaBuilding className="text-blue-600 text-4xl" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">Modern Facilities</h3>
 <pre className="bg-gray-900 text-blue-400 text-sm text-left p-4 rounded-lg overflow-x-auto font-mono shadow-inner">
<Typewriter
    words={[`Provides a quality education,
Offers a broad range of programs, 
Facilitates collaboration and innovation
through partnerships with local
businesses,research institutions.`]}
    loop={0} // 0 = infinite
    typeSpeed={40}
    deleteSpeed={30}
    delaySpeed={2000} // pause before retyping
  />
    </pre>
  </div>
</section>


      {/* Schools Data Section */}
<section className="py-20 px-6 max-w-7xl mx-auto">
  <h2
    className="text-4xl font-extrabold mb-16 text-center text-gray-900"
    data-aos="fade-up"
  >
   Available Schools
  </h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
  {Array.isArray(schools) && schools.length > 0 ? (
    schools.map((school, index) => (
      <div
        key={school.id}
        className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-500"
        data-aos="zoom-in"
        data-aos-delay={index * 100}
      >
        {/* School Image */}
        <Image
          src={`/schoolImages/${school.image}`}
          alt={school.name}
          width={400}
          height={250}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition duration-500"></div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 w-full p-5 text-white">
          <h3 className="text-xl font-bold drop-shadow-md">{school.name}</h3>
          <p className="text-sm opacity-90">{school.address}</p>
          <p className="text-xs opacity-75">{school.city}</p>
        </div>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">
      No schools available at the moment.
    </p>
  )}
</div>

</section>


      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          data-aos="fade-up"
        >
          Want to List Your School?
        </h2>
        <p
          className="mb-8 text-lg text-gray-100"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Join our platform today and showcase your school to thousands of
          potential students and parents.
        </p>
        <button
          className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          ➕ Add Your School
        </button>
      </section>
    </main>
  );
}
