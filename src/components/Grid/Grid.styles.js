import styled from 'styled-components';
export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 0 20px;

    h1 {
        color: var(--medGrey);

        @media screen and (max-width: 768px) {
            font-size: var(--fontBig);
        }
    }
`;

export const Content = styled.div`
    display: grid;
    // fr means fragment, and it below we divide the space into 3
    // grid-template-columns: 1fr 1fr 1fr; is same as:
    // grid-template-columns: repeat(3, 1fr)
    // grid-template-columns: 20px repeat(3, 1fr) 20px means that a 20px columns will be at the beginning and end
    // the grid-template-columns: repeat(3, minmax(min max)) syntax will make the column (i.e track) to be able to increase to max but will not reduce below min
    // in grid-auto-rows: minmax(100px, auto), this means that each auto created item will adjust to give space for the tallest item in the cell
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
`;