import Prompt from '@components/prompt'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Verify who is right
        <br/>
        <span className="orange_gradient">AI Will decide for you!</span>
      </h1>
      <Prompt/>
    </section>
  )
}

