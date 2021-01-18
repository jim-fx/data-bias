<script>
  export let persons;
  export let key;
  export let calcAvg;
  export let type = "achievement";
  export let isProm = person => {
    return person["AuszeichnungBesondereLeistung(j n)"] === "j";
  };

  $: nerds = persons.filter(isProm);
  $: normies = persons.filter(person => !isProm(person));

  $: avgNerd = calcAvg(nerds, key);
  $: avgNormie = calcAvg(normies, key);

  $: totalAvg = calcAvg(persons, key);

  let max = 0;
  let min = 0;
  for (const person of persons) {
    max = Math.max(max, person[key]);
    min = Math.min(min, person[key]);
  }

  $: difference = Math.floor(((avgNerd - avgNormie) / (max - min)) * 1000) / 10;
</script>

<style>
  .outer-wrapper {
    width: 100%;
    height: 200px;
    padding-bottom: 30px;
  }

  .wrapper {
    height: 90%;
    width: 90%;
    position: relative;
    border-bottom: solid thin gray;
    border-left: solid thin gray;
    margin: 5px;
    margin-left: 20px;
    box-sizing: border-box;
  }

  .datapoint {
    position: absolute;
    height: 10px;
    width: 5px;
    border-radius: 5px;
    background-color: black;
    bottom: 25%;
  }

  .datapoint.prom {
    background-color: red;
    bottom: 75%;
  }

  .datapoint > .details {
    position: absolute;
    padding: 5px;
    display: none;
    pointer-events: none;
    background-color: white;
    opacity: 0.9;
    border-radius: 5px;
    z-index: 99;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }

  .datapoint:hover > .details {
    display: block;
  }

  #min {
    position: absolute;
    left: 0px;
    bottom: -1.2em;
    transform: translateX(-50%);
  }

  #max {
    display: block;
    position: absolute;
    right: 0px;
    bottom: -1.2em;
    transform: translateX(50%);
  }

  #key {
    transform: rotate(-90deg) translateX(10px);
    transform-origin: 0px 0px;
  }

  .avg {
    background-color: green;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    opacity: 0.5;
    transform: translateY(25%) translateX(-25%);
  }

  #avgNerd {
    bottom: 75%;
  }
</style>

<div class="outer-wrapper">

  <p>Total Avg: {totalAvg}</p>

  {#if difference}

    {#if type === "achievement"}
      <p>Ausgezeichnete haben im Durchschnitt  <i><b>{difference}%</b> {difference>0?"bessere":"schlechtere"}</i> Ergebnisse im {key}</p>
    {:else if type === "kündigung"}
      <p>Gekündigte haben im Durchschnitt <i><b>{difference}%</b> {difference>0?"bessere":"schlechtere"}</i> Ergebnisse im {key}</p>
    {/if}

  {/if}

  <div class="wrapper">

    {#each persons as person}
      <div class="datapoint" class:prom={isProm(person)} style={`left: ${((person[key]-min)/(max-min))*100}%;`}>
        <div class="details">
          {person.Vorname} : {person[key]}
        </div>
      </div>
    {/each}

    <div id="min">{min}</div>
    <div id="max">{max}</div>

    {#if (typeof avgNormie === "number")}
      <div class="datapoint avg" id="avgNormie" style={`left: ${((avgNormie-min)/(max-min))*100}%;`}>
        <div class="details">
          Average: {Math.floor(avgNormie*100)/100} Punkte
        </div>
      </div>
    {/if}

    {#if (typeof avgNerd === "number")}
      <div class="datapoint avg" id="avgNerd" style={`left: ${((avgNerd-min)/(max-min))*100}%;`}>
        <div class="details">
          Average: {Math.floor(avgNerd*100)/100} Punkte
        </div>
      </div>
    {/if}

  </div>

  <div id="key">{key}</div>

</div>