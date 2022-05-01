const addCustomer = require("./ValidateCustomer")


test('response message should be Number is required', async () => {
    const result = await addCustomer("Mhamad Safa", "Lebanon", "")
    expect(result).toBe("Number is required")
})


test('response message should be Address is required', async () => {
    const result = await addCustomer("Mhamad Safa", "", "76554992")
    expect(result).toBe("Address is required")
})



test('response message should be Name is required', async () => {
    const result = await addCustomer("", "Address", "76554992")
    expect(result).toBe("Name is required")
})


test('response message should be Number is required', async () => {
    const result = await addCustomer("", "", "")
    expect(result).toBe("Number is required")
})
