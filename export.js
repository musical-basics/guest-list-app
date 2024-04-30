
document.addEventListener('DOMContentLoaded', function () {
    const exportButton = document.querySelector('button[type="exportButton"]');
    exportButton.addEventListener('click', exportToExcel);
});

function exportToExcel() {
    console.log("Exporting to Excel...");

    const tonightClubs = {
        'Marquee': [],
        'Jewel': [],
        'Hakkasan': [],
        'Tao': [],
        'Omnia': []
    };
    const poolClubs = {
        'Wet Republic': [],
        'Marquee Dayclub': [],
        'Tao Beach': [],
        'Liquid': []
    };
    const tomorrowNightClubs = {
        'Marquee': [],
        'Jewel': [],
        'Hakkasan': [],
        'Tao': [],
        'Omnia': []
    };




    const tableRows = document.querySelectorAll('#guestTable tbody tr');
    console.log("Number of table rows:", tableRows.length);

    const exportedEntries = []; // Array to store the keys of exported entries


    // Fetch data from Firebase
    firebase.database().ref('guestList').once('value', snapshot => {
        const guests = snapshot.val();
        console.log("Fetched data:", guests);

        Object.keys(guests).forEach((key, index) => {
            const guest = guests[key];
            console.log("Processing guest", index + 1, ":", guest);

            const { firstName, secondName, partySize, tonightClubs: guestTonightClubs, tomorrowPools: guestTomorrowPools, tomorrowNightClubs: guestTomorrowNightClubs, exportedStatus } = guest;

            console.log("Exported Status:", exportedStatus);

            if (!exportedStatus) { // Only process entries that have not been exported
                console.log("Entry not exported, processing...");
                exportedEntries.push(key); // Add the entry key to the exportedEntries array

                // Add first and second names to the club lists
                processClubEntries(guestTonightClubs, tonightClubs, firstName, secondName, partySize);
                processClubEntries(guestTomorrowPools, poolClubs, firstName, secondName, partySize);
                processClubEntries(guestTomorrowNightClubs, tomorrowNightClubs, firstName, secondName, partySize);




                // guestTonightClubs.forEach(club => {
                //     if (tonightClubs.hasOwnProperty(club)) {
                //         tonightClubs[club].push(`${firstName} ${partySize}`);
                //     }
                // });

                // guestTomorrowPools.forEach(club => {
                //     if (poolClubs.hasOwnProperty(club)) {
                //         poolClubs[club].push(`${firstName} ${partySize}`);
                //     }
                // });

                // guestTomorrowNightClubs.forEach(club => {
                //     if (tomorrowNightClubs.hasOwnProperty(club)) {
                //         tomorrowNightClubs[club].push(`${firstName} ${partySize}`);
                //     }
                // });
            } else {
                console.log("Entry already exported, skipping...");
            }
        });

        // Continue with creating the workbook and sheets as before
        const workbook = XLSX.utils.book_new();
        // Populate sheets and save workbook (existing code)
        // Update exported status in Firebase (existing code)
    });

    // // Get the header row
    // const headerRow = document.querySelector('#guestTable thead tr');
    // const headers = Array.from(headerRow.querySelectorAll('th')).map(th => th.innerText);
    // console.log("Headers:", headers);

    // tableRows.forEach(function (row, index) {
    //     console.log("Processing row", index + 1);

    //     const cells = row.querySelectorAll('td');
    //     const rowData = {};

    //     headers.forEach(function (header, cellIndex) {
    //         rowData[header] = cells[cellIndex].innerText;
    //     });

    //     console.log("Row data:", rowData);

    //     const firstName = rowData['First Person'];
    //     const secondName = rowData['Second Person'];
    //     const partySize = rowData['Party Size'];
    //     const tonightClubsData = rowData['Tonight Clubs'].split(', ');
    //     const poolClubsData = rowData['Tomorrow Pools'].split(', ');
    //     const tomorrowNightClubsData = rowData['Tomorrow Night Clubs'].split(', ');
    //     const exportedStatus = rowData['Exported Status'];

    //     // const cells = row.querySelectorAll('td');
    //     // const firstName = cells[1].innerText;
    //     // const secondName = cells[2].innerText;
    //     // const partySize = cells[3].innerText;
    //     // const tonightClubsData = cells[6].innerText.split(', ');
    //     // const poolClubsData = cells[7].innerText.split(', ');
    //     // const tomorrowNightClubsData = cells[8].innerText.split(', ');
    //     // const exportedStatus = cells[9].innerText; // Assuming the "Exported Status" is in the 12th column

    //     console.log("Exported Status:", exportedStatus);

    //     if (exportedStatus === 'false') { // Only process entries that have not been exported
    //         console.log("Entry not exported, processing...");

    //         const entryKey = row.dataset.entryKey; // Assuming the entry key is stored in a data attribute
    //         exportedEntries.push(entryKey); // Add the entry key to the exportedEntries array

    //         tonightClubsData.forEach(function (club) {
    //             if (tonightClubs.hasOwnProperty(club)) {
    //                 tonightClubs[club].push(`${firstName} ${partySize}`);
    //                 tonightClubs[club].push(`${secondName} ${partySize}`);
    //             }
    //         });

    //         poolClubsData.forEach(function (club) {
    //             if (poolClubs.hasOwnProperty(club)) {
    //                 poolClubs[club].push(`${firstName} ${partySize}`);
    //                 poolClubs[club].push(`${secondName} ${partySize}`);
    //             }
    //         });

    //         tomorrowNightClubsData.forEach(function (club) {
    //             if (tomorrowNightClubs.hasOwnProperty(club)) {
    //                 tomorrowNightClubs[club].push(`${firstName} ${partySize}`);
    //                 tomorrowNightClubs[club].push(`${secondName} ${partySize}`);
    //             }
    //         });
    //     } else {
    //         console.log("Entry already exported, skipping...");
    //     }
    // });

    console.log("Tonight Clubs:", tonightClubs);
    console.log("Pool Clubs:", poolClubs);
    console.log("Tomorrow Night Clubs:", tomorrowNightClubs);

    const workbook = XLSX.utils.book_new();

    const tonightData = Object.entries(tonightClubs).reduce((acc, [club, guests]) => {
        acc[club] = guests;
        return acc;
    }, {});
    const tonightSheet = XLSX.utils.json_to_sheet(transpose(tonightData), { header: Object.keys(tonightClubs) });
    XLSX.utils.book_append_sheet(workbook, tonightSheet, 'TONIGHT');

    const poolData = Object.entries(poolClubs).reduce((acc, [club, guests]) => {
        acc[club] = guests;
        return acc;
    }, {});
    const poolSheet = XLSX.utils.json_to_sheet(transpose(poolData), { header: Object.keys(poolClubs) });
    XLSX.utils.book_append_sheet(workbook, poolSheet, 'TMRW POOL');

    const tomorrowNightData = Object.entries(tomorrowNightClubs).reduce((acc, [club, guests]) => {
        acc[club] = guests;
        return acc;
    }, {});
    const tomorrowNightSheet = XLSX.utils.json_to_sheet(transpose(tomorrowNightData), { header: Object.keys(tomorrowNightClubs) });
    XLSX.utils.book_append_sheet(workbook, tomorrowNightSheet, 'TMRW NIGHT');

    console.log("Workbook created, saving to file...");

    XLSX.writeFile(workbook, 'output.xlsx');

    console.log("File saved, updating exported status in Firebase...");

    // Update the "Exported Status" of the exported entries in Firebase
    exportedEntries.forEach(function (entryKey) {
        firebase.database().ref('guestList').child(entryKey).update({ exportedStatus: true })
            .then(function () {
                console.log("Exported status updated for entry:", entryKey);
            })
            .catch(function (error) {
                console.error('Error updating exported status for entry:', entryKey, error);
            });
    });

    console.log("Export completed.");
}

function processClubEntries(clubData, clubList, firstName, secondName, partySize) {
    clubData.forEach(club => {
        if (clubList.hasOwnProperty(club)) {
            clubList[club].push(`${firstName} ${partySize}`);
            if (secondName) {
                clubList[club].push(`${secondName} ${partySize}`);
            }
        }
    });
}


function transpose(data) {
    const clubs = Object.keys(data);
    const guests = clubs.map(club => data[club]);
    const maxLength = Math.max(...guests.map(guestList => guestList.length));

    const transposedData = [];
    for (let i = 0; i < maxLength; i++) {
        const row = {};
        clubs.forEach(club => {
            row[club] = data[club][i] || '';
        });
        transposedData.push(row);
    }

    return transposedData;
}