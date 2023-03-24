import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import tw from 'twin.macro';

/* // font-family: 'Montserrat', sans-serif;
// font-family: 'Roboto', sans-serif; */

const GlobalStyle = createGlobalStyle`
  body{
    overflow: overlay;
    outline: none;
    list-style: none;
    box-sizing: border-box;
    line-height: normal;
    background-color: #F9F9F9;
  }

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

h2 ,p,span{
  font-size: 1.8rem;
}

html {
  max-width: 100%;
  /* overflow-x: hidden; */
  /* font-size: 64.5%; */
  font-size: 70%;
  scroll-behavior: smooth;
  *{
    color: black;
  }
}



.enableScroll{
  padding-right: 1rem;
}

/* end of defalte setting */
@media (max-width: 1535px)  {
  html {
    /* font-size: 55.5%; */
  }
  .enableScroll{
  padding-right: 0;
  }
}
@media (max-width: 1279px)  {
  html {
    font-size: 64.5%;
  }
  .enableScroll{
  padding-right: 0;
  }
}
@media (max-width: 1023px)  {
  html {
    /* font-size: 64.5%; */
  }
  .enableScroll{
  padding-right: 0;
  }
}
@media (max-width: 767px) {
  html {
    font-size:100%;
  }
  .enableScroll{
  padding-right: 0;
  }
}

@media (max-width: 639px) {
  html {
    font-size: 32%;
  }
  .enableScroll{
  padding-right: 0;
  }
} 

::-webkit-scrollbar {
  height: 0.1px;
  position: absolute;
  width: 1rem;
}

::-webkit-scrollbar-thumb {
  height: 0.1px;
  border-radius: 1rem;
}

.hover-pointer:hover {
  cursor: pointer;
}



.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 200ms;
}

.fade-appear-active {
  opacity: 1;
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 200ms;
}


/* antd */
/* calendar */
// AntD global≈

.icon-main{
  *{
    color: white;
  }
  stroke: white;
  svg{
    color: white;
  }
}

h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0;
    color: white;
    font-weight: 500;
}

p{
  margin-bottom: 0;
}


.ant-form-item-has-error .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector{
    box-shadow: none;
    border-width: 1px;
    outline: 0;
  }


  .ant-select-item-option-active:not(.ant-select-item-option-disabled){
    color:  white;
    ${tw`bg-black`}
  }

  .ant-select-dropdown{
    ${tw`bg-black`}
  }

  &.ant-select-item{
  }

  &.ant-select-item:hover{
    color:  white;
    ${tw`bg-gray-500`}
  }

  &.ant-select-item:not(:hover){
    color:  white;
    ${tw`bg-black`}
  }

  &.ant-dropdown{
    color:  white;
    ${tw`bg-black`}
  }

  &.ant-dropdown-menu{
    color:  white;
    ${tw`bg-black`}
  }

  &.ant-dropdown-menu-item{
    color:  white;
    ${tw`bg-black`}
  }

  &.ant-dropdown-menu-item:hover{
    color:  white;
    ${tw`bg-black`}
  }

  /* .ant-select-dropdown{
  background-color: red;
    *{
      color:red;
  }
} */

  &.ant-select-item-option-selected{
    color:  white;
    ${tw`bg-black`}
  }
  &.ant-select-item-option-selected:hover{
    color:  white;
    ${tw`bg-gray-500`}
  }

  .ant-select-selector .ant-select-selection-item{
    color: black;
  }

  .ant-select-selection-search input{
    color: black;
  }

  .ant-form .ant-form-item .ant-form-item-label {
    flex: none;
  }

  .form_item {
    flex-wrap: nowrap;
  }
  
`;

export default GlobalStyle;
