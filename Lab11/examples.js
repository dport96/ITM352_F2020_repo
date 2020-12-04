age = 54;
name = "Dan";
attributes  =  name + ";" + age + ";" + (age + 0.5) + ";" + (0.5 - age);
parts = attributes.split(name);
for(i in parts) {
   parts[i] = `${typeof parts[i]} ${parts[i]}`;  
}
console.log(parts.join(","));

