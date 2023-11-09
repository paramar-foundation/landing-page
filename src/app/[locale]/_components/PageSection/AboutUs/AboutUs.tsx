"use client";

import Image from "next/image";
import styles from "./AboutUs.module.scss";

export const AboutUs = () => {
  return (
    <article className={styles["about-us"]}>
      <h2 className={styles["about-us__title"]}>Sobre nosotras</h2>
      <p className={styles["about-us__body"]}>
        Conoce más sobre nuestra intención y objetivo como fundación, así como
        también sobre quiénes somos como fundación y cómo asignamos todas
        nuestras donaciones.
      </p>
      <div className={styles["about-us__cards"]}>
        <article className={styles.card}>
          <Image
            className={styles.card__image}
            src="/paint-aboutus-card-1.png"
            alt="paint splatter decoration"
            width={150}
            height={100}
          />
          <h5 className={styles.card__title}>¿Qué hacemos?</h5>
          <ul>
            <li>
              Ofrecemos sesiones individualizadas y personalizadas de terapia, a
              través de nuestro equipo de psicólogos, a mujeres y niñas víctimas
              de agresiones sexuales. Las sesiones se ofrecen en formato
              presencial y remoto, individual y grupal.
            </li>
            <li>
              Hacemos campañas e impartimos cursos de sensibilización a empresas
              e instituciones para ayudar a reducir el número de mujeres y niñas
              agredidas.
            </li>
          </ul>
        </article>
        <article className={styles.card}>
          <Image
            className={styles.card__image}
            src="/paint-aboutus-card-2.png"
            alt="paint splatter decoration"
            width={150}
            height={100}
          />
          <h5 className={styles.card__title}>¿Cómo ayudamos?</h5>
          <ul>
            <li>
              El 100% de los beneficios de estas terapias y cursos irán
              destinados a dar apoyo psicológico gratuito a otras mujeres y
              niñas, sin recursos, que son también víctimas de agresiones
              sexuales.
            </li>
            <li>
              Ofrecemos una plataforma para que otras personas contribuyan con
              esta misión a través de donaciones a nuestros proyectos.
            </li>
          </ul>
        </article>
        <article className={styles.card}>
          <Image
            className={styles.card__image}
            src="/paint-aboutus-card-3.png"
            alt="paint splatter decoration"
            width={150}
            height={100}
          />
          <h5 className={styles.card__title}>¿Quiénes somos?</h5>
          <ul>
            <li>
              Somos un grupo de profesionales con más de 20 años de experiencia
              en el campo de la psicología clínica y la dirección de proyectos
              sociales. Nuestros embajadores y gestores de Paramar Foundation
              han levantado y gestionado fondos por más de $1Bn USD durante sus
              carreras, generando un impacto económico y social positivo para
              diversas regiones a través de colaboraciones con{" "}
              <b>
                Prodis, Banco iberoamericano de comercio, Naciones Unidas,
                Instituto mexicano de identidad sexual
              </b>
              , etc.
            </li>
          </ul>
        </article>
      </div>
    </article>
  );
};
