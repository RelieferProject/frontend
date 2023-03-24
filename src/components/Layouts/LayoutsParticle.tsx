import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { IOptions, RecursivePartial } from 'tsparticles-engine';

interface Props {}

const ParticleWrapper = styled.div``;

function LayoutsParticle(props: Props) {
  const option: RecursivePartial<IOptions> = useMemo(() => {
    return {
      fullScreen: {
        enable: false,
      },
      fpsLimit: 120,
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#46bdf4',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 4, max: 6 },
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#46bdf4',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        events: {
          onhover: {
            enable: true,
            parallax: {
              enable: true,
              smooth: 10,
              force: 60,
            },
          },
        },
      },
      retina_detect: true,
      background: {
        image: '',
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
      },
    };
  }, []);

  const particleInit = useCallback((engine: any) => {
    return loadSlim(engine);
  }, []);

  return (
    <ParticleWrapper className="h-screen w-screen absolute top-0 left-0">
      <Particles className="w-full h-full" options={option} init={particleInit} />
    </ParticleWrapper>
  );
}

export default LayoutsParticle;
