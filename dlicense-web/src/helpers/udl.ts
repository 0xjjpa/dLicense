//@TODO: Support more than "One-Time-$"
export const parseLicenseFee = (licenseFee: string) => {
    const [_, amount] = licenseFee.split('One-Time-')
    return {label: 'Once payment', amount };
}