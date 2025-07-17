import { projects } from '../data/projects';

export default function Projetos() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Projetos</h2>
      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div key={idx} className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{proj.title}</h3>
            <p>{proj.description}</p>
            <ul className="list-disc ml-5 mt-2">
              {proj.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
            <div className="mt-2">
              <span className="font-semibold">Tecnologias: </span>
              {proj.technologies.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 