export function generateRandomData() {
    const dataTemplate = [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "m5gr84i9",
            amount: 316,
            status: "success",
            email: "ken99@yahoo.com",
        },
        {
            id: "3u1reuv4",
            amount: 242,
            status: "success",
            email: "Abe45@gmail.com",
        },
        {
            id: "derv1ws0",
            amount: 837,
            status: "processing",
            email: "Monserrat44@gmail.com",
        },
        {
            id: "5kma53ae",
            amount: 874,
            status: "success",
            email: "Silas22@gmail.com",
        },
        {
            id: "bhqecj4p",
            amount: 721,
            status: "failed",
            email: "carmella@hotmail.com",
        }
    ];

    const randomData: any[] = [];

    // Repeat each template object 20 times
    for (let i = 0; i < 1000; i++) {
        dataTemplate.forEach(item => {
            randomData.push(item);
        });
    }

    return randomData;
}

// Example usage
