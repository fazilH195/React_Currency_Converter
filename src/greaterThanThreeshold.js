const PERCENTAGE = 0.02;
const greaterThanThreeshold = (val1, val2) => {
    const difference = Math.abs(val1 - val2)
    const threshold =  PERCENTAGE * Math.max(val1, val2)

    return difference > threshold
}

export default greaterThanThreeshold;