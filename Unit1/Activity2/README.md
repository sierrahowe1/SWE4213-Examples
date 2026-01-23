# Activity 2: Learning React 
The goal of this activity is to get experience with building a static React webpage.

## Activity 2.1 - Create React Project

**Todo 1:** Create your React project

`npm create vite@latest`

- **Project Name:** activity2
- **Framework:** React 
- **Variant:** JavaScript 
- **Use Rolldown:** No 
- **Install with NPM and Start:** Yes 

## Activity 2.2 - Create React Form 

**Todo 2:** Create a new folder `src/components`

**Todo 3:** Copy over the following files into `src/components`

- `MyButton.jsx`
- `InpuField.jsx`
- `Form.jsx`

**Todo 4:** Copy over the following files into `src/`
- `App.css`
- `App.jsx`

**Todo 5:** In `MyButton.jsx` create an HTML button with the correct onClick that says "Submit Form".

<details>
  <summary>Reveal Answer</summary>

```JSX
export default function MyButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Click Me!
    </button>
  );
}

```
</details>
<br>

**Todo 6:** In `Form.jsx` add two more input fields email and phone. Additionally add your MyButton component.

<details>
  <summary>Reveal Answer</summary>

```JSX
return (
        <form>
            <InputField label="Name" placeholder="Enter your name..." value={form.name} name="name" onChange={handleChange} />
            
            <InputField label="Email" placeholder="Enter your email..." value={form.email} name="email" onChange={handleChange} />
            <InputField label="Phone" placeholder="506-123-4567" value={form.phoneNumber} name="phoneNumber" onChange={handleChange} />

            <MyButton onClick={onSubmit} />
        </form>
    );
```
</details>
<br>

**Todo 7:** In `Form.jsx` update the onSubmit function to log the form values to the console and reset them after.

<details>
  <summary>Reveal Answer</summary>

```JSX
function onSubmit(e) {
    e.preventDefault();

    // Log all of the values to the console 
    console.log("Name:", form.name);
    console.log("Email:", form.email);
    console.log("Phone Number:", form.phoneNumber);

    // Reset the form after submitting it 
    setForm({
        name: "",
        email: "",
        phoneNumber: "",
    });
}
```
</details>
<br>

**Todo 8:** Include the Form component in `App.jsx`.
<details>
  <summary>Reveal Answer</summary>

```JSX
function App() {

  return (
    <>
      <h1> SWE4213 Activity 2: </h1>
      <Form />
    </>
  )
}
```
</details>
<br>


## Activity 2.3 - Material UI

**Todo 9:** Install material UI `npm install @mui/material @emotion/react @emotion/styled`

**Todo 10:** Add any prebuilt MUI input to your Form (e.g., slider or rating). 
<details>
  <summary>Reveal Answer</summary>

**Import:**
```JSX
import Slider from '@mui/material/Slider';
```

**Form State:**
```JSX
 const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    sliderVal: 70,
});
```

**Form:**
```JSX
return (
    <form>
        <InputField label="Name" placeholder="Enter your name..." value={form.name} name="name" onChange={handleChange} />
        
        <InputField label="Email" placeholder="Enter your email..." value={form.email} name="email" onChange={handleChange} />
        <InputField label="Phone" placeholder="506-123-4567" value={form.phoneNumber} name="phoneNumber" onChange={handleChange} />

        <Slider size="large" value={form.sliderVal} min={0} max={100} valueLabelDisplay="auto" onChange={(e, newValue) => setForm((prev) => ({ ...prev, sliderVal: Number(newValue) }))} />

        <MyButton onClick={onSubmit} />
    </form>
);
```
</details>
<br>