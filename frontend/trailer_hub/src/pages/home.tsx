import { useTrailers } from "../hooks/useTrailers";

export default function Home() {
  const { homeFeed, loading } = useTrailers();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {homeFeed.map((section) => (
        <div key={section.categoria}>
          <h2>{section.categoria}</h2>

          {section.trailers.map((trailer: any) => (
            <p key={trailer.id}>{trailer.titulo}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
