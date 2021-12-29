import styled from "styled-components";
import {
  m,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  height: 300vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: transparent;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const TitleBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;
  color: black;
`;

const TitleConstraints = styled.div`
  width: 600px;
  height: 300px;
  background-color: transparent;
  border: 1px solid black;
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  align-self: center;
  justify-self: center;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 50%;
`;

const boxVariants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const CircleVariants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
  },
};

const titleBoxTransition = {
  hover: {
    fontWeight: 700,
    rotateX: 180,
  },
  click: {
    backgroundColor: "black",
    color: "white",
  },
};

const SVG = styled.svg`
  width: 200px;
  height: 200px;
  path : {
    stroke: black;
    stroke-width: 1;
  }
`;

const SVGvariants = {
  start: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  end: {
    fill: "rgba(255, 255, 255, 1)",
    pathLength: 1,
    transition: {
      default: { duration: 5 },
      fill: { duration: 1, delay: 3 },
    },
  },
};

function App() {
  const Constraints = useRef<HTMLDivElement>(null);
  const divPractice = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const returnXscale = useTransform(x, [-500, 400], [0.5, 2]);
  const returnXrotate = useTransform(x, [-500, 400], ["0", "360deg"]);

  const { scrollX, scrollY, scrollXProgress, scrollYProgress } =
    useViewportScroll();

  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  useEffect(() => {
    gradient.onChange(() => {
      console.log(gradient.get());
    });
  });

  useEffect(() => {
    if (divPractice.current) {
      const target = divPractice.current;
      target.addEventListener("click", () => {
        console.log("hello");
      });
    }
  }, []);

  return (
    <Wrapper ref={Constraints}>
      <div>hello</div>
      <button>click here</button>
    </Wrapper>
  );
}

export default App;
