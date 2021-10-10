import styled from 'styled-components'

/*
animation: animation-name animation-duration transition-timing-function animation-delay animation-iteration-count animation-direction animation-fill-mode animation-play-state

**animation-delay: seconds to wait before starting
**animation-iteration-count: a number or infinite
**animation-direction: reverse, alternate-reverse(backward then forward)
**animation-fill-mode: forwards, backwards, both
**animation-play-state: running or paused
**transition-timing-function eg linear, ease(default), ease-in(slow-start), ease-out(slow end), ease-in-out(slow start and end)
* cubic-bezier(time_start, progression_start, time_end, progression_end)
*   time_start and time_end take values between 0 to 1
    and are used to state the proportion of time within which progression_start and progression_end are expected to run
*   progression_start and progression_end can take values
    greater than 1 and when they do, they will go beyond what is expected of them before coming back
*/
export const Spinner = styled.div`
    border: 5px solid var(--lightGrey);
    border-top: 5px solid var(--medGrey);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;