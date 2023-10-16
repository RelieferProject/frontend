import styled from 'styled-components';
import logo from '@assets/logo.svg';

interface Props extends SimpleComponent {}

const BaseIconWrapper = styled.div``;

function BaseIcon(props: Props) {
  return (
    <BaseIconWrapper className={`${props.className}`}>
      <img className="w-8 h-8" src={logo} />
    </BaseIconWrapper>
  );
}

export default BaseIcon;
