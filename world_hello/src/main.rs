use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();
    // 读取控制台的输出
    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!(
        "The value of the element at index {} is: {}",
        index, element
    );
}



// struct Unit;
// trait SomeTrait {
//     // ...定义一些行为
// }

// // 我们并不关心结构体中有什么数据( 字段 )，但我们关心它的行为。
// // 因此这里我们使用没有任何字段的单元结构体，然后为它实现一些行为
// impl SomeTrait for Unit {  }

// fn main() {
//     let u = Unit;
//     do_something_with_unit(u);
// } 

// // 填空，让代码工作
// fn do_something_with_unit(u: Unit) {   }




// // // 修复所有错误，并且不要新增代码行
// // fn main() {
// //     let mut s = String::from("hello");
// //     s.push(',');
// //     s.push_str(" world");
// //     s += &"!".to_string();

// //     println!("{}", s)
// // }

// // // fn main() {
// // //     let string_append = String::from("hello ");
// // //     let string_rust = String::from("rust");
// // //     // &string_rust会自动解引用为&str
// // //     // let result = string_append + string_rust;
// // //     let result = string_append + &string_rust;
// // //     let mut result = result + "!"; // `result + "!"` 中的 `result` 是不可变的
// // //     result += "!!!";

// // //     println!("连接字符串 + -> {}", result);
// // // }

// // // // fn main() {
// // // //     let s = String::from("hello"); // s 进入作用域

// // // //     takes_ownership(s); // s 的值移动到函数里 .
// // // //                         // ... 所以到这里不再有效
// // // //     // println!("在move进函数后继续使用s: {}", s);

// // // //     let x = 5; // x 进入作用域

// // // //     makes_copy(x); // x 应该移动函数里，
// // // //                    // 但 i32 是 Copy 的，所以在后面可继续使用 x
// // // // } // 这里, x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
// // // //   // 所以不会有特殊操作

// // // // fn takes_ownership(some_string: String) {
// // // //     // some_string 进入作用域
// // // //     println!("{}", some_string);
// // // // } // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

// // // // fn makes_copy(some_integer: i32) {
// // // //     // some_integer 进入作用域
// // // //     println!("{}", some_integer);
// // // // } // 这里，some_integer 移出作用域。不会有特殊操作

// // // // // fn main() {
// // // // //     // 不要修改下面两行代码!
// // // // //     let (x, y) = (1, 2);
// // // // //     let s = sum(x, y);

// // // // //     assert_eq!(s, 3);
// // // // // }

// // // // // fn sum(x: i32, y: i32)->i32 {
// // // // //     x + y
// // // // // }

// // // // // // // 修改 `assert!` 让代码工作
// // // // // // fn main() {
// // // // // //     let v = 1_024 + 0xff + 0o77 + 0b1111_1111;
// // // // // //     assert!(v == 1579);
// // // // // // }

// // // // // // // // fn greet_world(){
// // // // // // // //     let southern_germany = "hi world";
// // // // // // // //     let chinese = "你好";
// // // // // // // //     let english = "world hi";
// // // // // // // //     let regions = [southern_germany,chinese,english];
// // // // // // // //     for region in regions.iter(){
// // // // // // // //         println!("{}",&region);
// // // // // // // //     }
// // // // // // // // }

// // // // // // // // fn main() {
// // // // // // // //     greet_world();
// // // // // // // // }
// // // // // // // fn main() {
// // // // // // //     let penguin_data = "\
// // // // // // //     common name,length (cm)
// // // // // // //     Little penguin,33
// // // // // // //     Yellow-eyed penguin,65
// // // // // // //     Fiordland penguin,60
// // // // // // //     Fiordland penguin,err
// // // // // // //     Invalid,data
// // // // // // //     ";

// // // // // // //     let records = penguin_data.lines();

// // // // // // //     for (i, record) in records.enumerate() {
// // // // // // //       if i == 0 || record.trim().len() == 0 {
// // // // // // //         continue;
// // // // // // //       }

// // // // // // //       // 声明一个 fields 变量，类型是 Vec
// // // // // // //       // Vec 是 vector 的缩写，是一个可伸缩的集合类型，可以认为是一个动态数组
// // // // // // //       // <_>表示 Vec 中的元素类型由编译器自行推断，在很多场景下，都会帮我们省却不少功夫
// // // // // // //       let fields: Vec<_> = record
// // // // // // //         .split(',')
// // // // // // //         .map(|field| field.trim())
// // // // // // //         .collect();
// // // // // // //       if cfg!(debug_assertions) {
// // // // // // //           // 输出到标准错误输出
// // // // // // //         eprintln!("debug: {:?} -> {:?}",
// // // // // // //                record, fields);
// // // // // // //       }

// // // // // // //       let name = fields[0];
// // // // // // //       // 1. 尝试把 fields[1] 的值转换为 f32 类型的浮点数，如果成功，则把 f32 值赋给 length 变量
// // // // // // //       //
// // // // // // //       // 2. if let 是一个匹配表达式，用来从=右边的结果中，匹配出 length 的值：
// // // // // // //       //   1）当=右边的表达式执行成功，则会返回一个 Ok(f32) 的类型，若失败，则会返回一个 Err(e) 类型，if let 的作用就是仅匹配 Ok 也就是成功的情况，如果是错误，就直接忽略
// // // // // // //       //   2）同时 if let 还会做一次解构匹配，通过 Ok(length) 去匹配右边的 Ok(f32)，最终把相应的 f32 值赋给 length
// // // // // // //       //
// // // // // // //       // 3. 当然你也可以忽略成功的情况，用 if let Err(e) = fields[1].parse::<f32>() {...}匹配出错误，然后打印出来，但是没啥卵用
// // // // // // //       if let Ok(length) = fields[1].parse::<f32>() {
// // // // // // //           // 输出到标准输出
// // // // // // //           println!("{}, {}cm", name, length);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }
