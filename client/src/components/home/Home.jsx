import styles from './home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.headlines}>
        <h1 >All in One Travel Planning</h1>
        <p>Your adventure begins here!</p>
      </header>

      <section>
        <h2>Plan your multi-destination trip</h2>
        <p>Plan your itinerary, book accommodations, and create unforgettable memories.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae repellat atque quam commodi, dolor ipsa. Exercitationem totam natus, autem officia dolorem repudiandae ea eaque dolores recusandae illum tempore mollitia neque aliquam itaque, nostrum, fugiat nulla aliquid rem enim rerum id provident eveniet quis. Quasi laboriosam dolorum sapiente, aliquam ipsam animi!</p>

      </section>

      <section>
        <h2>Plan your group trip</h2>
        <p>Share travel plans, photos and more with your friends and family.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae repellat atque quam commodi, dolor ipsa. Exercitationem totam natus, autem officia dolorem repudiandae ea eaque dolores recusandae illum tempore mollitia neque aliquam itaque, nostrum, fugiat nulla aliquid rem enim rerum id provident eveniet quis. Quasi laboriosam dolorum sapiente, aliquam ipsam animi!</p>

      </section>

      <section>
        <h2>Travel Tips</h2>
        <p>Get insider tips and advice to make the most of your travel experience.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae repellat atque quam commodi, dolor ipsa. Exercitationem totam natus, autem officia dolorem repudiandae ea eaque dolores recusandae illum tempore mollitia neque aliquam itaque, nostrum, fugiat nulla aliquid rem enim rerum id provident eveniet quis. Quasi laboriosam dolorum sapiente, aliquam ipsam animi!</p>
      </section>


    </div>
  )
}