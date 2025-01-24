export function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Вызов метода ${propertyKey} с аргументами: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}