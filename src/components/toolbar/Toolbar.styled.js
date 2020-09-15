import styled from 'styled-components';

export const StyledToolbar = styled.div`

  display: flex;
  float: right;
  margin-right: 40px;
  * {
    box-sizing: border-box; 
  }

  svg {
    pointer-events: none;
  }

  .chart-button-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow-x: auto; }

  .chart-button-group {
    display: flex;
    margin-bottom: 10px;
    border: 1px solid #bbb;
    border-top-color: #ccc;
    border-bottom-color: #888;
    border-radius: 3px; }

  .chart-button-group:not(:first-child) {
    margin-left: 1.5vw; }

  @media (max-device-width: 768px) {
    .chart-button-group:not(:first-child) {
      margin-left: 0; } }

  .chart-button-group-spacer {
    flex-grow: 1; }

  @media (max-device-width: 768px) {
    .chart-button-group-spacer {
      display: none; } }

  .chart-button {
    position: relative;
    float: left;
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.75em;
    font-weight: 600;
    white-space: nowrap;
    padding: 0 0.5em;
    margin: 0;
    outline: none;
    border: none;
    border-bottom: 1px solid #ddd;
    border-radius: 0;
    background: transparent; 
    min-width: 40px;
  }

  .chart-button:not(:first-child) {
    border-left: 1px solid #ccc; }

  .chart-button.chart-active {
    background: #cbeefa;
    color: black; }

  .chart-button:not(:disabled) {
    cursor: pointer; }

  .chart-button:disabled {
    color: rgba(0, 0, 0, 0.125); }

  @media (max-device-width: 768px) {
    .chart-button {
      letter-spacing: -0.01em;
      padding: 0 0.3em; } }
`;