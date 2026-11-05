/** KerdoivForm.jsx */
import { useForm } from "react-hook-form";
import { KERDESEK } from "./questions";
import { useState } from "react";

export default function KerdoivForm() {
    const [ isLoading, setLoading ] = useState(false)

    const { register, handleSubmit, reset, formState: {
        errors, isSubmitting, isSubmitSuccessful
    } } = useForm({
        defaultValues: {
            nev: "",
            email: "",
            
        }
    })

  // élő összegzéshez figyeljük a válaszokat
 

  const onSubmit = async (data) => {
    // data.valaszok pl.: { q1: "igen", q2: "nem", ... }
    // data.preventDefault()
    console.log("Beküldött adatok:", data);

    setLoading(true)
    await new Promise((r) => setTimeout(r, 5000)); // szimulált API
    setLoading(false)

    reset()
  };

  return (
    <>
        {isLoading && <p>Processing answers ...</p>}

        {!isLoading && 
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Kérdőív</h2>
            <h3>Kitöltési útmutató: Helyes válasz = igen.</h3>

            {/* --- Személyes adatok --- */}
            <fieldset>
                <legend>Személyes adatok</legend>

                <div>
                <label htmlFor="nev">Név</label>
                <input
                    id="nev"
                    name="nev"
                    {...register("nev")}
                />
                {errors.nev && <p className="hiba">{errors.nev.message}</p>} 
                </div>

                <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email" required={true}
                    name="email"
                    {...register("email")}
                />
                {errors.email && <p className="hiba">{errors.email.message}</p>} 
                </div>
            </fieldset>

            {/* --- Igen-nem kérdések --- */}
            <fieldset>
                <legend>Kérdések</legend>
                {KERDESEK.map( (kerdes, index) => <div className="kerdes" key={kerdes.id}>
                    <p>{index+1}. {kerdes.szoveg}</p>

                    <label>
                        <input type="radio" name={kerdes.id} value="igen" {...register(kerdes.id)} /> Igen
                    </label>
                    <label>
                        <input type="radio" name={kerdes.id} value="nem" {...register(kerdes.id)} /> Nem
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
        }
                
    </>
    

  );
}