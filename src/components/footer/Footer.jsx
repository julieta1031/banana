import css from "./footer.module.css"

const Footer = () => {
    const date = new Date().getFullYear()
    
  return <footer className={css.footer}>
     <span className={css.text}>

    </span>     
  </footer>;
};

export default Footer