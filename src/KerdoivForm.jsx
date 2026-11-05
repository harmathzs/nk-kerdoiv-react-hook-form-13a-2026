/** KerdoivForm.jsx */
import { useForm } from "react-hook-form";
import { KERDESEK } from "./questions";

export default function KerdoivForm() {


  // élő összegzéshez figyeljük a válaszokat
 

  const onSubmit = async (data) => {
    // data.valaszok pl.: { q1: "igen", q2: "nem", ... }
    console.log("Beküldött adatok:", data);
    await new Promise((r) => setTimeout(r, 800)); // szimulált API

  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Kérdőív</h2>
      <h3>Kitöltési útmutató: Helyes válasz = igen.</h3>

      {/* --- Személyes adatok --- */}
      <fieldset>
        <legend>Személyes adatok</legend>

        <div>
          <label htmlFor="nev">Név</label>
          <input
            id="nev"
           
          />
          <p className="hiba">errors.nev.message</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email" required={true}

          />
          <p className="hiba">errors.email.message</p>
        </div>
      </fieldset>

      {/* --- Igen-nem kérdések --- */}
      <fieldset>
        <legend>Kérdések</legend>
        {KERDESEK.map( (kerdes, index) => <div className="kerdes" key={kerdes.id}>
            <p>{index+1}. {kerdes.szoveg}</p>

            <label>
                <input type="radio" name={kerdes.id} value="igen" /> Igen
            </label>
            <label>
                <input type="radio" name={kerdes.id} value="nem" /> Nem
            </label>            
        </div> )}

      </fieldset>

      <button type="submit" >

      </button>



      {/* --- Élő összegzés (opcionális) --- */}
      <details style={{ marginTop: "1rem" }}>
        <summary>Élő összegzés</summary>
        <ul>

        </ul>
      </details>
    </form>
  );
}