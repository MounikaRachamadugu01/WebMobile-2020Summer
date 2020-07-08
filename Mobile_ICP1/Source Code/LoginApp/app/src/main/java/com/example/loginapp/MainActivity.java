package com.example.loginapp;
import android.view.View;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private EditText UserName;
    private EditText Password;
    private Button Login;
    private TextView Message;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        UserName = (EditText)findViewById(R.id.etUserName);
        Password = (EditText)findViewById(R.id.etPassword);
        Login = (Button)findViewById(R.id.btnLogin);
        Message = (TextView)findViewById(R.id.tvAttempts);

        Login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                validate(UserName.getText().toString(), Password.getText().toString());
            }
        });

    }
    private void validate(String userName, String userPassword){
        if((userName.equals("Mounika")) && (userPassword.equals("12345"))){

            Intent intent = new Intent(MainActivity.this, HomeActivity.class);
            startActivity(intent);
        }
        else{

            Message.setText("Incorrect User Name or Password");

        }
    }

}