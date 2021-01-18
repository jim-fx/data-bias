<script>
  import { onMount } from "svelte";

  import Person from "./Person.svelte";
  import Analyze from "./analyze/Analyze.svelte";
  import getWeights from "./analyze/getWeights.js";
  import { current, bewerber } from "./data";

  const keys = [
    "PunkteSportFittnestest",
    "PunktePraxistest",
    "PunkteTheorietest"
  ];

  let punishSportRaw = 0.1;
  let maxAge = 40;
  let ageMultiplierRaw = 100;
  $: ageMultiplier = ageMultiplierRaw / 50;

  // PunkteSportFittnestest,PunktePraxistest,PunkteTheorietest
  const weights = getWeights(current, keys);

  const currentYear = new Date().getFullYear();
  $: sortedBewerber =
    punishSportRaw + 1 + maxAge &&
    bewerber
      .map(b => {
        const [day, month, year] = b.Geburtsdatum.split(".");
        b.age = currentYear - parseInt(year);

        let score = 0;
        for (const key of keys) {
          score += b[key] * weights[key];
        }
        b.score = score;

        //Punish normies

        const fitness = b.PunkteSportFittnestest;
        if (fitness < 60) {
          const mapped = 1 - (fitness - 20) / 40;
          b.score -= mapped * punishSportRaw;
        }

        if (b.age > maxAge) {
          const diff = b.age - maxAge;
          b.score -= diff * ageMultiplier;
        }

        return b;
      })
      .sort((bewerberA, bewerberB) => {
        return bewerberB.score - bewerberA.score;
      });

  let interfaceState;

  $: if (interfaceState) window.location.hash = interfaceState;

  onMount(() => {
    const { hash = "bewerber" } = window.location;
    interfaceState = hash.replace("#", "");
  });
</script>

<style>
  main {
    font-family: sans-serif;
    max-width: 600px;
    margin: 0 auto;
  }

  table {
    border: solid thin;
    border-collapse: collapse;
  }

  thead {
    font-weight: bold;
  }

  .weights {
    height: 20px;
    background-color: red;
    position: relative;
  }

  .weights > .weight {
    display: inline-block;
    height: 100%;
  }

  .weight > p {
    position: absolute;
    padding-left: 5px;
    font-size: 0.5em;
    text-align: left;
  }
</style>

<main>

{#if interfaceState === "analyze"}

  <button on:click={() => (interfaceState = "bewerber")}>Bewerber</button>

  <br>
  <br>

  <h2>Analyze</h2>

  <Analyze data={current}/>

{:else}

  <button on:click={() => (interfaceState = "analyze")}>Analyze</button>

  <br>
  <br>

  <details>

    <summary>Gewichtung</summary>

    <br>

    <div class="weights">
      {#each Object.keys(weights) as key,i}
        <div class="weight" style={`width: ${weights[key]*100}%; background-color: hsl(${i*50}deg 50% 50%)`}>
          <p>
            {key}: <br>
            <b>{Math.floor(weights[key]*1000)/10}%</b>
          </p>
        </div>
      {/each}
    </div>

  </details>

  <br>
  <br>

  <label for="punishSport">Leute mit Sporttestergebnissen unter 60 bestrafen {punishSportRaw}%</label>
  <br>
  <input type="range" min="0" max="100" id="punishSport" bind:value={punishSportRaw}>
  <br>
  <br>
  
  <label for="useAge">Optimales Alter, was da los? {maxAge}</label>
  <br>
  <input type="range" min="20" max="50" id="useAge" bind:value={maxAge}>
  
  <br>
  <br>

  <label for="useAge">Alter Multiplikator {ageMultiplier}</label>
  <br>
  <input type="range" min="0" max="100" id="useAge" bind:value={ageMultiplierRaw}>

  <br>
  <br>

  <table>

    <thead>
      <tr>
        <td>Name</td>
        <td>Score</td>
        <td>Alter</td>
      </tr>
    </thead>

    {#each sortedBewerber as person,i}
      <Person person={person} accepted={i<5}/>
    {/each}
  </table>

{/if}

</main>
