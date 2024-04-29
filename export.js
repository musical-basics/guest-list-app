document.addEventListener('DOMContentLoaded', function() {
    const exportButton = document.getElementById('exportButton');
    exportButton.addEventListener('click', exportToExcel);
  });
  
  function exportToExcel() {
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
    tableRows.forEach(function(row) {
      const cells = row.querySelectorAll('td');
      const firstName = cells[1].innerText;
      const secondName = cells[2].innerText;
      const partySize = cells[3].innerText;
  
      const tonightClubsData = cells[6].innerText.split(', ');
      const poolClubsData = cells[7].innerText.split(', ');
      const tomorrowNightClubsData = cells[8].innerText.split(', ');
  
      tonightClubsData.forEach(function(club) {
        if (tonightClubs.hasOwnProperty(club)) {
          tonightClubs[club].push(`${firstName} ${partySize}`);
          tonightClubs[club].push(`${secondName} ${partySize}`);
        }
      });
  
      poolClubsData.forEach(function(club) {
        if (poolClubs.hasOwnProperty(club)) {
          poolClubs[club].push(`${firstName} ${partySize}`);
          poolClubs[club].push(`${secondName} ${partySize}`);
        }
      });
  
      tomorrowNightClubsData.forEach(function(club) {
        if (tomorrowNightClubs.hasOwnProperty(club)) {
          tomorrowNightClubs[club].push(`${firstName} ${partySize}`);
          tomorrowNightClubs[club].push(`${secondName} ${partySize}`);
        }
      });
    });
  
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
  
    XLSX.writeFile(workbook, 'output.xlsx');
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