var data = {
    linkBackCounts: [1472, 616, 483, 388],
    linkCountTotal: 13931
}

data.percents = data.linkBackCounts.map((num) => (num / data.linkCountTotal * 100).toFixed(2) + '%')
console.log(data);