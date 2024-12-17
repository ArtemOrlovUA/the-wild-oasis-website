import Counter from '../components/Counter';

export default async function Cabins() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  const data = await res.json();

  console.log(data);

  return (
    <div>
      <h1>Our Cabins</h1>
      <ul>
        {data.map((cabin) => (
          <li key={cabin.id}>{cabin.name}</li>
        ))}
      </ul>

      <Counter users={data} />
    </div>
  );
}
