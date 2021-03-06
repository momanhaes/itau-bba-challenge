export const THEME = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  'z-index': -1,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const PARAMS = {
  particles: {
    number: {
      value: 125,
      density: {
        enable: true,
        value_area: 962.0472365193136,
      },
    },
    color: {
      value: '#fa8341',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#fa8341',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.37680183430339786,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#344675',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
