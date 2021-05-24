import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import "./About.css";

function About() {
  const history = useHistory();
  return (
    <div className="about">
      <Header handleSearch={() => history.push("/patientInfo")} />
      <div className="about__header">
        <h1>About</h1>
      </div>
      <div className="about__body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non
          mauris lectus. Vestibulum ac lorem sodales, aliquam nisl eu, posuere
          lorem. Integer rutrum tincidunt fringilla. Sed iaculis mollis sem ut
          dictum. In porttitor blandit sapien, nec lobortis arcu. Pellentesque
          posuere, lacus ut ultrices rutrum, mauris dui ornare justo, nec
          posuere magna lacus id est. Sed tempor nisi et nisl pulvinar dapibus.
          Integer finibus placerat sagittis. Curabitur eget vulputate purus, nec
          vehicula massa. Vivamus laoreet lectus nulla, vitae faucibus magna
          malesuada nec. Morbi vel aliquam lectus. In pulvinar gravida sapien et
          imperdiet. Nunc faucibus interdum bibendum. Integer finibus urna id
          ante faucibus, non dictum felis pretium. Quisque consequat feugiat
          dui, non fermentum nisl suscipit ornare. Proin ornare tincidunt massa
          id tincidunt. Curabitur mollis metus nunc, quis sodales elit ultricies
          vel. In placerat ut leo eu auctor. Aliquam sit amet iaculis dui.
          Suspendisse potenti. Vestibulum egestas diam a quam convallis
          ultrices. Praesent feugiat augue orci, egestas fermentum arcu
          imperdiet at. Suspendisse sed leo egestas, viverra tortor ut,
          sollicitudin massa. Cras suscipit, risus eget porta varius, orci
          turpis scelerisque dui, in rutrum urna arcu in nisi. Vestibulum sit
          amet lacinia odio, eu imperdiet nulla. Suspendisse nulla turpis,
          facilisis a ornare ac, consectetur eu arcu. Sed faucibus turpis eget
          molestie finibus. Proin efficitur ante elit, euismod condimentum sem
          pulvinar sit amet. Cras diam quam, semper eu enim sit amet, volutpat
          ornare felis. In pellentesque iaculis risus, in imperdiet purus
          scelerisque vitae. Nulla a gravida erat, eu condimentum neque.
          Pellentesque finibus diam quis elit gravida sodales. Cras lacus nisl,
          rhoncus quis nisi sit amet, ornare interdum massa. Etiam facilisis
          pulvinar accumsan. Sed vitae sapien quam. Aenean condimentum quis
          justo vel tincidunt. Proin interdum pellentesque ex. Curabitur
          accumsan dui dolor, sed dignissim tortor condimentum a. Cras arcu
          purus, varius vel eros quis, tempor elementum odio. Donec non massa
          ex. Pellentesque nunc sem, vehicula sit amet diam id, ultrices ornare
          metus. Nam ut porttitor est. Suspendisse leo ante, imperdiet vel velit
          sit amet, accumsan ullamcorper massa. Vivamus suscipit ante in
          vehicula placerat. Nullam nec libero consectetur lorem pretium mattis
          fermentum non est. Nunc vel nisl convallis, iaculis dolor sit amet,
          cursus tortor. Fusce vulputate malesuada augue, eget facilisis metus
          lacinia vel. Pellentesque tincidunt libero tortor, a congue velit
          aliquam a.
        </p>
      </div>
    </div>
  );
}

export default About;
