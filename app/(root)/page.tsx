import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 56,
    author: { _id: 1, name: 'George Ambington' },
    _id: 1,
    description: 'This is a description.',
    image: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: "Animals",
    title: "Grey kitten"
  }, {
    _createdAt: new Date(),
    views: 56,
    author: { _id: 2, name: 'Sofia Karovski' },
    _id: 2,
    description: 'This is a description 2.',
    image: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: "Animals",
    title: "Cute kitten"
  }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect With Enterpreneurs</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions!
        </p>

        <SearchForm query={query} />

      </section>

      <section className="section_container" >
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Show all startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts?.map((post: StartupCardType, number) => (
              <StartupCard key={post?._id} post = {post} />
            ))) : (
            <p className="no-results"> No startups found </p>
          )}
        </ul>
      </section>

    </>
  )
}
