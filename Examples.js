var myNetwork = { 	
    'friends': ["Dan", "rick"],
    'co-workers': ["Sally", "Joe"]
};

for(relationship in myNetwork) {
    console.log(`${relationship} are ${myNetwork[relationship].join(',')}`);
    }
