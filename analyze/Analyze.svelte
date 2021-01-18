<script>
  import Person from "../Person.svelte";
  import Graph from "./Graph.svelte";
  import average from "../helpers/average";
  import median from "../helpers/median";

  export let data;

  let ausgezeichnete = [];
  let nichtAusgezeichnete = [];

  data.forEach(person => {
    if (person["AuszeichnungBesondereLeistung(j n)"] === "j") {
      ausgezeichnete.push(person);
    } else {
      nichtAusgezeichnete.push(person);
    }
  });

  let useMedian = true;

  $: calcAvg = useMedian ? median : average;
</script>

<style>
  details > .content {
    max-height: 200px;
    overflow-y: auto;
  }
</style>

<label for="median">Median</label>
<input type="checkbox" id="median" bind:checked={useMedian}>

<br>
<br>

<details>
  <summary>ausgezeichnete {ausgezeichnete.length}</summary>
  <div class="content">
    {#each ausgezeichnete as person}
      <Person person={person}/>
    {/each}
  </div>
</details>

<details>
  <summary>nichtAusgezeichnete {nichtAusgezeichnete.length}</summary>
  <div class="content">
    {#each nichtAusgezeichnete as person}
      <Person person={person}/>
    {/each}
  </div>
</details>

<h2>Korrelation von Auszeichnugen zu Testergebnissen</h2>

<h3>
  Sport
</h3>

<Graph {calcAvg} persons={data} key="PunkteSportFittnestest" />

<br>
<br>
<br>

<h3>
  Praxis
</h3>

<Graph {calcAvg} persons={data} key="PunktePraxistest" />

<br>
<br>
<br>

<h3>
  Theorie
</h3>

<Graph {calcAvg} persons={data} key="PunkteTheorietest" />

<br>
<br>
<br>

<h2>Korrelation von Kündigungen und Testergebnissen</h2>

<h3>
  Sport
</h3>

<Graph type="kündigung" {calcAvg} persons={data} key="PunkteSportFittnestest" isProm={person => person["Status(a g p)"] === "g"} />

<br>
<br>
<br>

<h3>
  Praxis
</h3>

<Graph type="kündigung" {calcAvg} persons={data} key="PunktePraxistest" isProm={person => person["Status(a g p)"] === "g"} />

<br>
<br>
<br>

<h3>
  Theorie
</h3>

<Graph type="kündigung" {calcAvg} persons={data} key="PunkteTheorietest" isProm={person => person["Status(a g p)"] === "g"} />
