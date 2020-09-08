const f = [
  {
    creator: '\n  Dr. Drang\n',
    title: 'Parsing date strings in Shortcuts',
    link: 'https://leancrew.com/all-this/2020/09/parsing-date-strings-in-shortcuts/',
    pubDate: 'Sat, 05 Sep 2020 04:39:09 +0000',
    'content:encoded': '\n' +
      '  <p>I didn’t realize until today that Shortcuts has a date parser. It doesn’t call itself a date parser, and the documentation doesn’t explain what kinds of text strings it can parse, but it’s Shortcuts, so what would you expect?</p>\n' +
      '<p>I found it more or less by accident as I was writing a shortcut similar to <a href="https://leancrew.com/all-this/2020/04/not-quite-repeating-calendar-events/">this one</a> from a few months ago. Last year, I switched from monthly contact lenses to semi-monthly. They’re thinner, more comfortable, and settle in place almost immediately.<sup id="fnref:settle"><a href="#fn:settle" rel="footnote">1</a></sup> But without a big, obvious change in the calendar, I’ve found it harder to remember to change them in the middle of the month. On the plus side, I’ve inadvertently learned that I can wear them much longer than 15–16 days with no ill effects.</p>\n' +
      '<p>Based on this experience, I’ve decided I should switch them out every three weeks. Again, this is not a schedule I’m going to remember on my own, so I built a shortcut to run on the night I throw a set of lenses away. It adds an event to my personal calendar to remind me to throw the next set away in three weeks.</p>\n' +
      '<p><img alt="Contact lens calendar event" class="ss" src="https://leancrew.com/all-this/images2020/20200904-Contact%20lens%20calendar%20event.jpg" title="Contact lens calendar event" width="90%"/></p>\n' +
      '<p>I expect to run the shortcut at any time of day, possibly even the next morning when I open up a new set of contacts. But I want the event—and the alert associated with it—to be at a particular time in the evening. This means I can’t get the date and time of the event by just adding three weeks to the date and time at which I run the shortcut. And I certainly wasn’t going to force myself to use those idiotic spinners to set the time—the time is fixed and the shortcut should handle it automatically.</p>\n' +
      '<p>Here’s my solution, which you can <a href="https://www.icloud.com/shortcuts/501b939235564d7598fa390b24752453">download</a>:</p>\n' +
      '<table width="100%">\n' +
      '<tr><th>Step</th><th>Action</th><th>Comment</th></tr>\n' +
      '<tr>\n' +
      '<td>1</td>\n' +
      '<td width="50%"><img alt="Contact Lens Calendar Step 01" src="https://leancrew.com/all-this/images2020/20200904-Contact%20Lens%20Calendar%20Step%2001.png" title="Contact Lens Calendar Step 01" width="100%"/></td>\n' +
      '<td>Get the date I threw away the last set of contacts. This should be the current date, but I allow an adjustment in case I run this the next morning.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>2</td>\n' +
      '<td width="50%"><img alt="Contact Lens Calendar Step 02" src="https://leancrew.com/all-this/images2020/20200904-Contact%20Lens%20Calendar%20Step%2002.png" title="Contact Lens Calendar Step 02" width="100%"/></td>\n' +
      '<td>Create a text string with the date from Step 1 and a time of 9:00 pm. The format of Provided Input is shown later in the post.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>3</td>\n' +
      '<td width="50%"><img alt="Contact Lens Calendar Step 03" src="https://leancrew.com/all-this/images2020/20200904-Contact%20Lens%20Calendar%20Step%2003.png" title="Contact Lens Calendar Step 03" width="100%"/></td>\n' +
      '<td>Here’s the parsing step. It turns the date string from Step 1 into a date/time combo.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>4</td>\n' +
      '<td width="50%"><img alt="Contact Lens Calendar Step 04" src="https://leancrew.com/all-this/images2020/20200904-Contact%20Lens%20Calendar%20Step%2004.png" title="Contact Lens Calendar Step 04" width="100%"/></td>\n' +
      '<td>This is the date/time for the calendar event. The magic variable for this step is called End Date.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>5</td>\n' +
      '<td width="50%"><img alt="Contact Lens Calendar Step 05" src="https://leancrew.com/all-this/images2020/20200904-Contact%20Lens%20Calendar%20Step%2005.png" title="Contact Lens Calendar Step 05" width="100%"/></td>\n' +
      '<td>If I throw the contacts away on the date set in Step 1, I start wearing a new set a day later. This magic variable is called Start Date.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>6</td>\n' +
      '<td width="50%"><img alt="Contact Lens Calendar Step 06" src="https://leancrew.com/all-this/images2020/20200904-Contact%20Lens%20Calendar%20Step%2006.png" title="Contact Lens Calendar Step 06" width="100%"/></td>\n' +
      '<td>Here we create a new calendar event for throwing away the next set of contacts. There’s an alarm and some information in the Notes field.</td>\n' +
      '</tr>\n' +
      '</table>\n' +
      '<p>Here’s how the Provided Input date is formatted:</p>\n' +
      '<p><img alt="Formatting the date for parsing" class="ss" src="https://leancrew.com/all-this/images2020/20200904-Formatting%20the%20date%20for%20parsing.jpg" title="Formatting the date for parsing" width="70%"/></p>\n' +
      '<p>As I said at the top, I don’t know all the formats the <span class="menu">Get Dates From Input</span> step can parse, but I figured <code>yyyy-mm-dd HH:MM:SS</code> would work, and it does.</p>\n' +
      '<p>Most scripting languages I’ve used have a way to change some date/time fields while leaving the others untouched, but Shortcuts apparently doesn’t. I was searching and scrolling, trying to find such a command, when I ran across <span class="menu">Get Dates From Input</span>. It does the job.</p>\n' +
      '<p>Why don’t I just set up an event that repeats every three weeks? Mainly because of my poor experience with doing that for switching out <a href="https://leancrew.com/all-this/2020/04/not-quite-repeating-calendar-events/">my CPAP supplies</a>: the real world often intervenes, forcing you to change your carefully planned schedule. I find it easier to run a shortcut than to reset a recurring event. If I find that my contact lens schedule doesn’t change after several months of using this, I’ll switch to a long-running recurring event.</p>\n' +
      '<div class="footnotes">\n' +
      '<hr/>\n' +
      '<ol>\n' +
      '<li id="fn:settle">\n' +
      '<p>I have astigmatism, so my contacts aren’t axisymmetric; they have to be oriented a particular way to work. They’re weighted to help them spin around to the right angle. When I was wearing monthlies, the right contact would usually take at least five minutes to rotate to the correct position and sometimes wouldn’t settle in for half an hour or so. <a href="#fnref:settle" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/09/parsing-date-strings-in-shortcuts/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'I didn’t realize until today that Shortcuts has a date parser. It doesn’t call itself a date parser, and the documentation doesn’t explain what kinds of text strings it can parse, but it’s Shortcuts, so what would you expect?\n' +
      'I found it more or less by accident as I was writing a shortcut similar to this one from a few months ago. Last year, I switched from monthly contact lenses to semi-monthly. They’re thinner, more comfortable, and settle in place almost immediately.1 But without a big, obvious change in the calendar, I’ve found it harder to remember to change them in the middle of the month. On the plus side, I’ve inadvertently learned that I can wear them much longer than 15–16 days with no ill effects.\n' +
      'Based on this experience, I’ve decided I should switch them out every three weeks. Again, this is not a schedule I’m going to remember on my own, so I built a shortcut to run on the night I throw a set of lenses away. It adds an event to my personal calendar to remind me to throw the next set away in three weeks.\n' +
      '\n' +
      'I expect to run the shortcut at any time of day, possibly even the next morning when I open up a new set of contacts. But I want the event—and the alert associated with it—to be at a particular time in the evening. This means I can’t get the date and time of the event by just adding three weeks to the date and time at which I run the shortcut. And I certainly wasn’t going to force myself to use those idiotic spinners to set the time—the time is fixed and the shortcut should handle it automatically.\n' +
      'Here’s my solution, which you can download:\n' +
      'StepActionComment\n' +
      '1\n' +
      '\n' +
      'Get the date I threw away the last set of contacts. This should be the current date, but I allow an adjustment in case I run this the next morning.\n' +
      '\n' +
      '\n' +
      '2\n' +
      '\n' +
      'Create a text string with the date from Step 1 and a time of 9:00 pm. The format of Provided Input is shown later in the post.\n' +
      '\n' +
      '\n' +
      '3\n' +
      '\n' +
      'Here’s the parsing step. It turns the date string from Step 1 into a date/time combo.\n' +
      '\n' +
      '\n' +
      '4\n' +
      '\n' +
      'This is the date/time for the calendar event. The magic variable for this step is called End Date.\n' +
      '\n' +
      '\n' +
      '5\n' +
      '\n' +
      'If I throw the contacts away on the date set in Step 1, I start wearing a new set a day later. This magic variable is called Start Date.\n' +
      '\n' +
      '\n' +
      '6\n' +
      '\n' +
      'Here we create a new calendar event for throwing away the next set of contacts. There’s an alarm and some information in the Notes field.\n' +
      '\n' +
      '\n' +
      'Here’s how the Provided Input date is formatted:\n' +
      '\n' +
      'As I said at the top, I don’t know all the formats the Get Dates From Input step can parse, but I figured yyyy-mm-dd HH:MM:SS would work, and it does.\n' +
      'Most scripting languages I’ve used have a way to change some date/time fields while leaving the others untouched, but Shortcuts apparently doesn’t. I was searching and scrolling, trying to find such a command, when I ran across Get Dates From Input. It does the job.\n' +
      'Why don’t I just set up an event that repeats every three weeks? Mainly because of my poor experience with doing that for switching out my CPAP supplies: the real world often intervenes, forcing you to change your carefully planned schedule. I find it easier to run a shortcut than to reset a recurring event. If I find that my contact lens schedule doesn’t change after several months of using this, I’ll switch to a long-running recurring event.\n' +
      'I have astigmatism, so my contacts aren’t axisymmetric; they have to be oriented a particular way to work. They’re weighted to help them spin around to the right angle. When I was wearing monthlies, the right contact would usually take at least five minutes to rotate to the correct position and sometimes wouldn’t settle in for half an hour or so. ↩\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  I didn’t realize until today that Shortcuts has a date parser. It doesn’t call itself a date parser, and the documentation doesn’t explain what kinds of text strings it can parse, but it’s Shortcuts, so what would you expect?\n',
    contentSnippet: 'I didn’t realize until today that Shortcuts has a date parser. It doesn’t call itself a date parser, and the documentation doesn’t explain what kinds of text strings it can parse, but it’s Shortcuts, so what would you expect?',
    guid: 'https://leancrew.com/all-this/2020/09/parsing-date-strings-in-shortcuts/',
    isoDate: '2020-09-05T04:39:09.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'A battery BitBar bonanza',
    link: 'https://leancrew.com/all-this/2020/08/a-battery-bitbar-bonanza/',
    pubDate: 'Sun, 30 Aug 2020 23:36:19 +0000',
    'content:encoded': '\n' +
      '  <p>I started reading <a href="https://forum.keyboardmaestro.com/new">this thread</a> on the Keyboard Maestro forum because I’ve been interested in the <a href="https://amazon.com/dp/B06XKNZT1P?tag=andnowitsa085-20">Stream Deck</a> (yes, that’s an affiliate link) for a while and will probably be getting one soon. I kept reading because <a href="https://rhymeswithdiploma.com/">TJ Luoma</a>’s answer made me realize I didn’t need the Stream Deck to use the ideas in his solution; it would work just as well with <a href="https://github.com/matryer/bitbar">BitBar</a>.</p>\n' +
      '<p>The idea is to use the output of <a href="https://www.manpagez.com/man/8/ioreg/"><code>ioreg</code></a> to get the battery levels of the keyboard, trackpad, and mouse, and to then use that information to tell the user it’s time to recharge. You may be thinking, “isn’t that what the low battery notifications are for?” Yes, but the problem is those notifications always seem to appear when you’re in the middle of work and don’t want to be interrupted. The idea behind a notice on your Stream Deck or in your menu bar is that you don’t need to dismiss it to get back to work, and it’s still there to remind you when you have time to plug in or change batteries.</p>\n' +
      '<p>As a practical matter, I couldn’t just tweak TJ’s solution to make it work with BitBar. TJ is a shell scripting wizard, and his script is strong evidence of that. Although I can follow the logic of what he’s doing, I would never feel comfortable trying to adjust it to my needs. So I took his ideas, rewrote them in Python, and added the parts necessary to drive BitBar.</p>\n' +
      '<p>The script, or <em>plugin</em>, as BitBar likes to call it, is <code>batteries.1h.py</code>, and it gives me a menu bar item that looks like this:<sup id="fnref:snell"><a href="#fn:snell" rel="footnote">1</a></sup></p>\n' +
      '<p><img alt="BitBar batteries" class="ss" src="https://leancrew.com/all-this/images2020/20200830-BitBar%20batteries.png" title="BitBar batteries" width="90%"/></p>\n' +
      '<p>When one of the input devices gets low on battery, the menu bar icon changes from a battery,🔋, to a plug, 🔌, to tell me its time to plug in. And if I ever connect an I/O device that isn’t a keyboard, trackpad, or mouse, the icon will change to a joystick, 🕹.</p>\n' +
      '<p>Here’s the source code of <code>batteries.1h.py</code></p>\n' +
      '<pre><code>python:\n' +
      ' 1:  #!/usr/bin/python3\n' +
      ' 2:  \n' +
      ' 3:  import subprocess\n' +
      ' 4:  import re\n' +
      ' 5:  \n' +
      ' 6:  # Initialize\n' +
      " 7:  limits = {'keyboard': 20, 'trackpad': 15, 'mouse': 15}\n" +
      ' 8:  deviceTypes = limits.keys()\n' +
      ' 9:  anyLow = False\n' +
      '10:  anyOdd = False\n' +
      "11:  menuString = ['---']\n" +
      '12:  \n' +
      '13:  # Regexes for capturing product names and battery percentages\n' +
      `14:  productRE = re.compile(r'Product" = "(.+?)"')\n` +
      `15:  batteryRE = re.compile(r'"BatteryPercent" = (\\d+)')\n` +
      '16:  \n' +
      '17:  # Capture the output of ioreg. Remarkably, the output is\n' +
      '18:  # encoded in MacRoman, which will rear its ugly head if a\n' +
      '19:  # device has a name like Drang’s Mouse (w/ curly apostrophe).\n' +
      "20:  cmd = 'ioreg -r -k BatteryPercent'.split()\n" +
      "21:  ioreg = subprocess.check_output(cmd).decode('macroman')\n" +
      '22:  \n' +
      '23:  # The ioreg output is a series of paragraphs, one for each\n' +
      '24:  # product. Go through each, looking for low batteries and\n' +
      '25:  # adding the appropriate item to menuString. Low batteries are\n' +
      '26:  # printed in red; weird results, like unknown devices and\n' +
      '27:  # missing battery percentages, are printed in purple.\n' +
      "28:  for p in ioreg.split('\\n\\n'):\n" +
      '29:    productMatch = productRE.search(p)\n' +
      '30:    batteryMatch = batteryRE.search(p)\n' +
      '31:    if productMatch and batteryMatch:\n' +
      '32:      name = productMatch.group(1)\n' +
      '33:      battery = int(batteryMatch.group(1))\n' +
      "34:      device = ''\n" +
      '35:      for d in deviceTypes:\n' +
      '36:        if d in name.lower():\n' +
      '37:          device = d\n' +
      '38:          break\n' +
      '39:      if device:\n' +
      '40:        if battery &lt; limits[device]:\n' +
      "41:          menuString.append(f'{device.capitalize()} {battery}%|color=#AA0000')\n" +
      '42:          anyLow = True\n' +
      '43:        else:\n' +
      "44:          menuString.append(f'{device.capitalize()} {battery}%')\n" +
      '45:      else:\n' +
      "46:        menuString.append(f'{name}|color=purple')\n" +
      '47:        anyOdd = True\n' +
      '48:  \n' +
      '49:  # BitBar output\n' +
      '50:  if anyLow:\n' +
      "51:    print('🔌')\n" +
      '52:  elif anyOdd:\n' +
      "53:    print('🕹')\n" +
      '54:  else:\n' +
      "55:    print('🔋')\n" +
      "56:  print('\\n'.join(menuString))\n" +
      '</code></pre>\n' +
      '<p>The key to this was the recognition that the output of</p>\n' +
      '<pre><code>ioreg -r -k BatteryPercent\n' +
      '</code></pre>\n' +
      '<p>can be thought of as a series of paragraphs, one for each I/O device with an entry named BatteryPercent. The script captures the output of this command in Line 21, splits it into paragraphs on Line 28, and extracts the product name and battery level for each device. This information is used to construct the multiline text output in Lines 50–56 that BitBar parses to assemble the menu.</p>\n' +
      '<p>One weird thing I found while writing this script is that <code>ioreg</code> uses the old <a href="https://en.wikipedia.org/wiki/Mac_OS_Roman">MacRoman text encoding</a> for its output.  Both of my devices used possessives in their product names, e.g., “Dr. Drang’s Trackpad,” and the curly apostrophe has a byte value (in hex) of <code>0xD5</code>. When I first started looking through <code>ioreg</code>’s output, I saw that this was rendered in my terminal as “Dr. DrangÕs Trackpad,” because <code>0xD5</code> is Õ in UTF-8 (and Latin-1). Thus the call to <code>decode(\'macroman\') in Line 21. I realize updating</code>ioreg` is not one of Apple’s most pressing concerns, but it’s been two decades, Craig. None of Apple’s command line utilities should be spitting out MacRoman anymore.</p>\n' +
      '<p>I must note that TJ’s script is more tolerant of unusual output from <code>ioreg</code> than mine is and handles it in a more granular way. I flatly ignore certain useless outputs, because I just don’t think they’ll ever show up. It’s part of my devil-may-care personality.</p>\n' +
      '<p>Anyway, this was a fun exercise, and I now have another potentially useful item in my menu bar. It’ll be months before I know whether I take heed of this warning, but one thing I do know is that I’ve been dismissing low battery notifications for years; a warning in the menu bar has to be better than that.</p>\n' +
      '<div class="footnotes">\n' +
      '<hr/>\n' +
      '<ol>\n' +
      '<li id="fn:snell">\n' +
      '<p>Yes, I’m also using the <a href="https://sixcolors.com/post/2020/08/how-bad-is-the-air-out-there/">air quality BitBar plugin</a> that Jason Snell wrote a few days ago. <a href="#fnref:snell" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/a-battery-bitbar-bonanza/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'I started reading this thread on the Keyboard Maestro forum because I’ve been interested in the Stream Deck (yes, that’s an affiliate link) for a while and will probably be getting one soon. I kept reading because TJ Luoma’s answer made me realize I didn’t need the Stream Deck to use the ideas in his solution; it would work just as well with BitBar.\n' +
      'The idea is to use the output of ioreg to get the battery levels of the keyboard, trackpad, and mouse, and to then use that information to tell the user it’s time to recharge. You may be thinking, “isn’t that what the low battery notifications are for?” Yes, but the problem is those notifications always seem to appear when you’re in the middle of work and don’t want to be interrupted. The idea behind a notice on your Stream Deck or in your menu bar is that you don’t need to dismiss it to get back to work, and it’s still there to remind you when you have time to plug in or change batteries.\n' +
      'As a practical matter, I couldn’t just tweak TJ’s solution to make it work with BitBar. TJ is a shell scripting wizard, and his script is strong evidence of that. Although I can follow the logic of what he’s doing, I would never feel comfortable trying to adjust it to my needs. So I took his ideas, rewrote them in Python, and added the parts necessary to drive BitBar.\n' +
      'The script, or plugin, as BitBar likes to call it, is batteries.1h.py, and it gives me a menu bar item that looks like this:1\n' +
      '\n' +
      'When one of the input devices gets low on battery, the menu bar icon changes from a battery,🔋, to a plug, 🔌, to tell me its time to plug in. And if I ever connect an I/O device that isn’t a keyboard, trackpad, or mouse, the icon will change to a joystick, 🕹.\n' +
      'Here’s the source code of batteries.1h.py\n' +
      'python:\n' +
      ' 1:  #!/usr/bin/python3\n' +
      ' 2:  \n' +
      ' 3:  import subprocess\n' +
      ' 4:  import re\n' +
      ' 5:  \n' +
      ' 6:  # Initialize\n' +
      " 7:  limits = {'keyboard': 20, 'trackpad': 15, 'mouse': 15}\n" +
      ' 8:  deviceTypes = limits.keys()\n' +
      ' 9:  anyLow = False\n' +
      '10:  anyOdd = False\n' +
      "11:  menuString = ['---']\n" +
      '12:  \n' +
      '13:  # Regexes for capturing product names and battery percentages\n' +
      `14:  productRE = re.compile(r'Product" = "(.+?)"')\n` +
      `15:  batteryRE = re.compile(r'"BatteryPercent" = (\\d+)')\n` +
      '16:  \n' +
      '17:  # Capture the output of ioreg. Remarkably, the output is\n' +
      '18:  # encoded in MacRoman, which will rear its ugly head if a\n' +
      '19:  # device has a name like Drang’s Mouse (w/ curly apostrophe).\n' +
      "20:  cmd = 'ioreg -r -k BatteryPercent'.split()\n" +
      "21:  ioreg = subprocess.check_output(cmd).decode('macroman')\n" +
      '22:  \n' +
      '23:  # The ioreg output is a series of paragraphs, one for each\n' +
      '24:  # product. Go through each, looking for low batteries and\n' +
      '25:  # adding the appropriate item to menuString. Low batteries are\n' +
      '26:  # printed in red; weird results, like unknown devices and\n' +
      '27:  # missing battery percentages, are printed in purple.\n' +
      "28:  for p in ioreg.split('\\n\\n'):\n" +
      '29:    productMatch = productRE.search(p)\n' +
      '30:    batteryMatch = batteryRE.search(p)\n' +
      '31:    if productMatch and batteryMatch:\n' +
      '32:      name = productMatch.group(1)\n' +
      '33:      battery = int(batteryMatch.group(1))\n' +
      "34:      device = ''\n" +
      '35:      for d in deviceTypes:\n' +
      '36:        if d in name.lower():\n' +
      '37:          device = d\n' +
      '38:          break\n' +
      '39:      if device:\n' +
      '40:        if battery < limits[device]:\n' +
      "41:          menuString.append(f'{device.capitalize()} {battery}%|color=#AA0000')\n" +
      '42:          anyLow = True\n' +
      '43:        else:\n' +
      "44:          menuString.append(f'{device.capitalize()} {battery}%')\n" +
      '45:      else:\n' +
      "46:        menuString.append(f'{name}|color=purple')\n" +
      '47:        anyOdd = True\n' +
      '48:  \n' +
      '49:  # BitBar output\n' +
      '50:  if anyLow:\n' +
      "51:    print('🔌')\n" +
      '52:  elif anyOdd:\n' +
      "53:    print('🕹')\n" +
      '54:  else:\n' +
      "55:    print('🔋')\n" +
      "56:  print('\\n'.join(menuString))\n" +
      '\n' +
      'The key to this was the recognition that the output of\n' +
      'ioreg -r -k BatteryPercent\n' +
      '\n' +
      'can be thought of as a series of paragraphs, one for each I/O device with an entry named BatteryPercent. The script captures the output of this command in Line 21, splits it into paragraphs on Line 28, and extracts the product name and battery level for each device. This information is used to construct the multiline text output in Lines 50–56 that BitBar parses to assemble the menu.\n' +
      "One weird thing I found while writing this script is that ioreg uses the old MacRoman text encoding for its output.  Both of my devices used possessives in their product names, e.g., “Dr. Drang’s Trackpad,” and the curly apostrophe has a byte value (in hex) of 0xD5. When I first started looking through ioreg’s output, I saw that this was rendered in my terminal as “Dr. DrangÕs Trackpad,” because 0xD5 is Õ in UTF-8 (and Latin-1). Thus the call to decode('macroman') in Line 21. I realize updatingioreg` is not one of Apple’s most pressing concerns, but it’s been two decades, Craig. None of Apple’s command line utilities should be spitting out MacRoman anymore.\n" +
      'I must note that TJ’s script is more tolerant of unusual output from ioreg than mine is and handles it in a more granular way. I flatly ignore certain useless outputs, because I just don’t think they’ll ever show up. It’s part of my devil-may-care personality.\n' +
      'Anyway, this was a fun exercise, and I now have another potentially useful item in my menu bar. It’ll be months before I know whether I take heed of this warning, but one thing I do know is that I’ve been dismissing low battery notifications for years; a warning in the menu bar has to be better than that.\n' +
      'Yes, I’m also using the air quality BitBar plugin that Jason Snell wrote a few days ago. ↩\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  I started reading <a href="https://forum.keyboardmaestro.com/new">this thread</a> on the Keyboard Maestro forum because I’ve been interested in the <a href="https://amazon.com/dp/B06XKNZT1P?tag=andnowitsa085-20">Stream Deck</a> (yes, that’s an affiliate link) for a while and will probably be getting one soon. I kept reading because <a href="https://rhymeswithdiploma.com/">TJ Luoma</a>’s answer made me realize I didn’t need the Stream Deck to use the ideas in his solution; it would work just as well with <a href="https://github.com/matryer/bitbar">BitBar</a>.\n',
    contentSnippet: 'I started reading this thread on the Keyboard Maestro forum because I’ve been interested in the Stream Deck (yes, that’s an affiliate link) for a while and will probably be getting one soon. I kept reading because TJ Luoma’s answer made me realize I didn’t need the Stream Deck to use the ideas in his solution; it would work just as well with BitBar.',
    guid: 'https://leancrew.com/all-this/2020/08/a-battery-bitbar-bonanza/',
    isoDate: '2020-08-30T23:36:19.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'RSS and the pleasure of not thinking',
    link: 'https://leancrew.com/all-this/2020/08/rss-and-the-pleasure-of-not-thinking/',
    pubDate: 'Fri, 28 Aug 2020 15:19:35 +0000',
    'content:encoded': '\n' +
      '  <p>I listened to the recent <a href="https://www.relay.fm/mpu/550"><em>Mac Power Users</em> episode on RSS</a> while on a long walk the other day, and I really enjoyed it. Partly, of course, because I just like listening to Stephen and David, but mainly because I didn’t feel I had any stake in it.</p>\n' +
      '<p>As I’ve mentioned here several times, I have <a href="https://leancrew.com/all-this/2018/02/my-feed-reading-system/">a homemade system</a> for reading RSS feeds. And although I am willing to switch to a different setup, that different setup would have to be a tremendous improvement. Here are the advantages of what I have:</p>\n' +
      '<ul>\n' +
      '<li>On the reader side, it looks the way I want it to look because it’s just an HTML page that I wrote. There are no buttons or toolbars on-screen except the ones I want.</li>\n' +
      '<li>It always gives me up-to-date articles. In my experience,<sup id="fnref:experience"><a href="#fn:experience" rel="footnote">1</a></sup> some RSS aggregator services don’t poll sites often enough (or use <a href="https://www.w3.org/TR/websub/">WebSub</a>) to keep up with edited articles. So what you get from the aggregator may not be what the article currently says. My system updates every 20 minutes, so I don’t miss edits unless they’re very recent.</li>\n' +
      '<li>I don’t have to think about moving to a new aggregator because the one I’m currently using just went out of business or decided to increase its subscription fee. Or because an aggregator I’m not using just reduced its fee.</li>\n' +
      '<li>I don’t have to think about switching readers for all those same reasons.</li>\n' +
      '</ul>\n' +
      '<p>Honestly, it’s the “not thinking” part that’s the best. Over the 35 years I’ve been a computer user, way too much of my time has been spent thinking about the “right” software to buy. Some of this has been forced on me—when an app or service stops working, there’s no way to avoid thinking about the alternatives—but a lot has been self-inflicted. It’s nice to have one part of my computing life that’s stable and should continue to be stable for years to come.<sup id="fnref:time"><a href="#fn:time" rel="footnote">2</a></sup></p>\n' +
      '<p>In some ways, I suppose, listening to Stephen and David talk about RSS was akin to <em>schadenfreude</em>. I could walk along, smug in the knowledge that I wouldn’t be balancing the upsides and downsides. I could just turn off my mind, relax, and float downstream.</p>\n' +
      '<div class="footnotes">\n' +
      '<hr/>\n' +
      '<ol>\n' +
      '<li id="fn:experience">\n' +
      '<p>My experience is, admittedly, now well out of date, as I haven’t looked into aggregators in several years. I suspect stale articles aren’t much of a problem if you use one of the big, popular aggregators. <a href="#fnref:experience" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '<li id="fn:time">\n' +
      '<p>Was the time I spent writing my RSS scripts more than the time I would now spend thinking about the “best” RSS aggregator and reader? Doesn’t matter. I enjoyed writing the scripts. I learned new things and got satisfaction out of seeing them run correctly. I get nothing like that out of comparing apps and services. <a href="#fnref:time" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/rss-and-the-pleasure-of-not-thinking/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'I listened to the recent Mac Power Users episode on RSS while on a long walk the other day, and I really enjoyed it. Partly, of course, because I just like listening to Stephen and David, but mainly because I didn’t feel I had any stake in it.\n' +
      'As I’ve mentioned here several times, I have a homemade system for reading RSS feeds. And although I am willing to switch to a different setup, that different setup would have to be a tremendous improvement. Here are the advantages of what I have:\n' +
      'On the reader side, it looks the way I want it to look because it’s just an HTML page that I wrote. There are no buttons or toolbars on-screen except the ones I want.\n' +
      'It always gives me up-to-date articles. In my experience,1 some RSS aggregator services don’t poll sites often enough (or use WebSub) to keep up with edited articles. So what you get from the aggregator may not be what the article currently says. My system updates every 20 minutes, so I don’t miss edits unless they’re very recent.\n' +
      'I don’t have to think about moving to a new aggregator because the one I’m currently using just went out of business or decided to increase its subscription fee. Or because an aggregator I’m not using just reduced its fee.\n' +
      'I don’t have to think about switching readers for all those same reasons.\n' +
      'Honestly, it’s the “not thinking” part that’s the best. Over the 35 years I’ve been a computer user, way too much of my time has been spent thinking about the “right” software to buy. Some of this has been forced on me—when an app or service stops working, there’s no way to avoid thinking about the alternatives—but a lot has been self-inflicted. It’s nice to have one part of my computing life that’s stable and should continue to be stable for years to come.2\n' +
      'In some ways, I suppose, listening to Stephen and David talk about RSS was akin to schadenfreude. I could walk along, smug in the knowledge that I wouldn’t be balancing the upsides and downsides. I could just turn off my mind, relax, and float downstream.\n' +
      'My experience is, admittedly, now well out of date, as I haven’t looked into aggregators in several years. I suspect stale articles aren’t much of a problem if you use one of the big, popular aggregators. ↩\n' +
      'Was the time I spent writing my RSS scripts more than the time I would now spend thinking about the “best” RSS aggregator and reader? Doesn’t matter. I enjoyed writing the scripts. I learned new things and got satisfaction out of seeing them run correctly. I get nothing like that out of comparing apps and services. ↩\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  I listened to the recent <a href="https://www.relay.fm/mpu/550"><em>Mac Power Users</em> episode on RSS</a> while on a long walk the other day, and I really enjoyed it. Partly, of course, because I just like listening to Stephen and David, but mainly because I didn’t feel I had any stake in it.\n',
    contentSnippet: 'I listened to the recent Mac Power Users episode on RSS while on a long walk the other day, and I really enjoyed it. Partly, of course, because I just like listening to Stephen and David, but mainly because I didn’t feel I had any stake in it.',
    guid: 'https://leancrew.com/all-this/2020/08/rss-and-the-pleasure-of-not-thinking/',
    isoDate: '2020-08-28T15:19:35.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'A new old Python',
    link: 'https://leancrew.com/all-this/2020/08/a-new-old-python/',
    pubDate: 'Mon, 24 Aug 2020 12:59:28 +0000',
    'content:encoded': '\n' +
      '  <p>You may have noticed something new in <a href="https://leancrew.com/all-this/2020/08/bitbar-superduper-and-library-books/">yesterday’s scripts</a>: the shebang lines were</p>\n' +
      '<pre><code>#!/usr/bin/python3\n' +
      '</code></pre>\n' +
      '<p>I’ve been using Python 3 for quite a while, but it’s been a version installed through <a href="https://www.anaconda.com/products/individual">Anaconda</a>, not one that came from Apple. The reasons are</p>\n' +
      '<ol>\n' +
      '<li>Apple didn’t provide a Python 3 until Catalina; and</li>\n' +
      '<li>I didn’t install Catalina on either of my Macs until this past month.</li>\n' +
      '</ol>\n' +
      '<p>I intend to keep using the Anaconda-installed version as my regular Python because its environment has all the tools I regularly use in my work: NumPy, SciPy, Pandas, and Matplotlib. But the BitBar scripts were a good way to try out Apple’s Python 3; they needed Python 3’s UTF-8 support<sup id="fnref:utf8"><a href="#fn:utf8" rel="footnote">1</a></sup> and didn’t need any of those math/science libraries.</p>\n' +
      '<p>While I said above that Apple provides Python 3 in Catalina, that may be stretching the definition of “provide.” If you look in <code>/usr/bin</code>, you’ll find something called <code>python3</code>, but that something may be just a placeholder. If you haven’t installed the Command Line Developer Tools, trying to execute a script via <code>/usr/bin/python3</code> will get you an error message about an “invalid active developer path.” This happened to me on one of my Macs; presumably, the CLDTs had already been installed on the other Mac and were updated when I switched to Catalina.</p>\n' +
      '<p>If you need to install the CLDTs, <a href="https://flaviocopes.com/fix-xcrun-error-invalid-active-developer-path/">this explanation by Flavio Copes</a> of how to do so via the <code>xcode-select</code> command is clear and concise. Once you’ve done so, you can test your new Python 3 by running</p>\n' +
      '<pre><code>/usr/bin/python3 --version\n' +
      '</code></pre>\n' +
      '<p>at the command line. You should get <code>Python 3.7.3</code> as the response. This was the version released over a year ago, which means its remarkably fresh for an Apple-supplied command-line tool.</p>\n' +
      '<p>If you need to install third-party libraries, as I did with the <a href="https://pypi.org/project/mechanize/">Mechanize</a> and <a href="https://www.crummy.com/software/BeautifulSoup/bs4/doc/">BeautifulSoup</a> libraries used in my library BitBar script, you’ll have to run the Python 3 version of <code>pip</code> like this:</p>\n' +
      '<pre><code>/usr/bin/pip3 install mechanize\n' +
      '</code></pre>\n' +
      '<p>You’ll probably get a warning that your version of <code>pip</code> isn’t up to date. As with Python 3 itself, the <code>pip</code> that comes from Apple is over a year old. It’ll still work.</p>\n' +
      '<p>As I said earlier, I don’t expect to be using Apple’s Python 3 in the future, but it’s nice to see that Mac users can use a modern Python without resort to third-party systems like Homebrew or Anaconda.</p>\n' +
      '<div class="footnotes">\n' +
      '<hr/>\n' +
      '<ol>\n' +
      '<li id="fn:utf8">\n' +
      '<p>OK, <em>they</em> didn’t need UTF-8 support, but <em>I</em> did. I’m too old to keep doing <a href="https://pyvideo.org/pycon-us-2012/pragmatic-unicode-or-how-do-i-stop-the-pain.html">the encode/decode dance</a>. <a href="#fnref:utf8" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/a-new-old-python/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'You may have noticed something new in yesterday’s scripts: the shebang lines were\n' +
      '#!/usr/bin/python3\n' +
      '\n' +
      'I’ve been using Python 3 for quite a while, but it’s been a version installed through Anaconda, not one that came from Apple. The reasons are\n' +
      'Apple didn’t provide a Python 3 until Catalina; and\n' +
      'I didn’t install Catalina on either of my Macs until this past month.\n' +
      'I intend to keep using the Anaconda-installed version as my regular Python because its environment has all the tools I regularly use in my work: NumPy, SciPy, Pandas, and Matplotlib. But the BitBar scripts were a good way to try out Apple’s Python 3; they needed Python 3’s UTF-8 support1 and didn’t need any of those math/science libraries.\n' +
      'While I said above that Apple provides Python 3 in Catalina, that may be stretching the definition of “provide.” If you look in /usr/bin, you’ll find something called python3, but that something may be just a placeholder. If you haven’t installed the Command Line Developer Tools, trying to execute a script via /usr/bin/python3 will get you an error message about an “invalid active developer path.” This happened to me on one of my Macs; presumably, the CLDTs had already been installed on the other Mac and were updated when I switched to Catalina.\n' +
      'If you need to install the CLDTs, this explanation by Flavio Copes of how to do so via the xcode-select command is clear and concise. Once you’ve done so, you can test your new Python 3 by running\n' +
      '/usr/bin/python3 --version\n' +
      '\n' +
      'at the command line. You should get Python 3.7.3 as the response. This was the version released over a year ago, which means its remarkably fresh for an Apple-supplied command-line tool.\n' +
      'If you need to install third-party libraries, as I did with the Mechanize and BeautifulSoup libraries used in my library BitBar script, you’ll have to run the Python 3 version of pip like this:\n' +
      '/usr/bin/pip3 install mechanize\n' +
      '\n' +
      'You’ll probably get a warning that your version of pip isn’t up to date. As with Python 3 itself, the pip that comes from Apple is over a year old. It’ll still work.\n' +
      'As I said earlier, I don’t expect to be using Apple’s Python 3 in the future, but it’s nice to see that Mac users can use a modern Python without resort to third-party systems like Homebrew or Anaconda.\n' +
      'OK, they didn’t need UTF-8 support, but I did. I’m too old to keep doing the encode/decode dance. ↩\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  You may have noticed something new in <a href="https://leancrew.com/all-this/2020/08/bitbar-superduper-and-library-books/">yesterday’s scripts</a>: the shebang lines were\n',
    contentSnippet: 'You may have noticed something new in yesterday’s scripts: the shebang lines were',
    guid: 'https://leancrew.com/all-this/2020/08/a-new-old-python/',
    isoDate: '2020-08-24T12:59:28.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'BitBar, SuperDuper, and library books',
    link: 'https://leancrew.com/all-this/2020/08/bitbar-superduper-and-library-books/',
    pubDate: 'Sun, 23 Aug 2020 20:57:19 +0000',
    'content:encoded': '\n' +
      '  <p>Jason Snell’s <a href="https://sixcolors.com/post/2020/08/put-anything-in-your-macs-menu-bar-with-bitbar/">recent post</a> on <a href="https://github.com/matryer/bitbar">BitBar</a> inspired me to build a couple of menu bar notices of my own.</p>\n' +
      '<p>The first was a rewrite of <a href="https://leancrew.com/all-this/2015/04/anybar-and-superduper/">the SuperDuper notice</a> I used to use with a similar menu bar utility called <a href="https://github.com/tonsky/AnyBar">AnyBar</a>. It puts a thumbs up in the menu bar if the most recent scheduled SuperDuper backup was successful, and a thumbs down if it wasn’t. Clicking on the item brings up a summary of SuperDuper’s log file:</p>\n' +
      '<p><img alt="BitBar SuperDuper notice" class="ss" src="https://leancrew.com/all-this/images2020/20200821-BitBar%20SuperDuper%20notice.png" title="BitBar SuperDuper notice" width="70%"/></p>\n' +
      '<p>The log summary is in gray text because it doesn’t do anything—it’s like a series of disabled menu items.</p>\n' +
      '<p>The second BitBar notice is a little more complicated. It gets the status of items my family has checked out or on hold at our local library and presents them in the menu. If a checked-out item is due soon (or overdue) or if an item on hold is ready to be picked up, the book item in the menu bar is red; otherwise, it’s blue. Either way, the items are listed in the submenus.<sup id="fnref:nero"><a href="#fn:nero" rel="footnote">1</a></sup></p>\n' +
      '<p><img alt="BitBar Library" class="ss" src="https://leancrew.com/all-this/images2020/20200822-BitBar%20Library.png" title="BitBar Library" width="90%"/></p>\n' +
      '<p>In addition to the submenus, this one also allows some items in the menu to be chosen. If an item is due soon, it will be enabled in the menu, and choosing it will open Safari to the library’s login page. This speeds up renewing a book if I want to keep it longer.</p>\n' +
      '<p>BitBar uses the daunting words “plugin” and “API” to describe the code that configures these menu bar items, but they’re just programs that write lines of text to standard output. If you’ve ever written any kind of program in any language, you can write a BitBar plugin. There are <a href="https://github.com/matryer/bitbar#plugin-api">several rules</a> for the output, but the main ones are:</p>\n' +
      '<blockquote>\n' +
      '<ul>\n' +
      '<li>Multiple lines will be cycled through over and over.</li>\n' +
      '<li>If your output contains a line consisting only of <code>---</code>, the lines below it will appear in the dropdown for that plugin, but won’t appear in the menu bar itself.</li>\n' +
      '<li>Lines beginning with <code>--</code> will appear in submenus.</li>\n' +
      '</ul>\n' +
      '</blockquote>\n' +
      '<p>You save the programs in a folder that you set up when you run BitBar the first time (before you have any plugins written). I use <code>~/.bitbar</code>.</p>\n' +
      '<p>My SuperDuper plugin, named <code>superduper.6h.py</code> in accordance with the <a href="https://github.com/matryer/bitbar#configure-the-refresh-time">BitBar plugin naming format</a>, is this Python script:</p>\n' +
      '<pre><code>python:\n' +
      ' 1:  #!/usr/bin/python3\n' +
      ' 2:  \n' +
      ' 3:  import os\n' +
      ' 4:  \n' +
      ' 5:  # Where the SuperDuper! log files are.\n' +
      ' 6:  logdir = (os.environ["HOME"] +\n' +
      ' 7:            "/Library/Application Support/" +\n' +
      ' 8:            "SuperDuper!/Scheduled Copies/" +\n' +
      ' 9:            "Smart Update Backup from Macintosh HD.sdsp/Logs/")\n' +
      '10:  \n' +
      '11:  def sdinfo(s):\n' +
      '12:    "Return just the timestamp and process information from a SuperDuper line."\n' +
      "13:    parts = s.split('|')\n" +
      '14:    ratespot = parts[3].find("at an effective transfer rate")\n' +
      '15:    if ratespot &gt; -1:\n' +
      '16:      parts[3] = parts[3][:ratespot]\n' +
      '17:    detailspot = parts[3].find("(")\n' +
      '18:    if detailspot &gt; -1:\n' +
      '19:      parts[3] = parts[3][:detailspot]\n' +
      `20:    return "%s: %s" % (parts[1].strip(), parts[3].strip(' \\\\\\n'))\n` +
      '21:  \n' +
      '22:  # Get the last log file.\n' +
      "23:  logfiles = [x for x in os.listdir(logdir) if x[-5:] == 'sdlog']\n" +
      '24:  logfiles.sort()\n' +
      '25:  lastlog = logdir + logfiles[-1]\n' +
      '26:  \n' +
      '27:  # Collect data for BitBar\n' +
      '28:  notices = []\n' +
      '29:  with open(lastlog) as f:\n' +
      '30:    for line in f:\n' +
      '31:      for signal in ["Started on", "PHASE:", "Copied", "Cloned", "Copy complete"]:\n' +
      '32:          if signal in line:\n' +
      '33:            notices.append(sdinfo(line))\n' +
      '34:  \n' +
      '35:  # Format output for BitBar\n' +
      '36:  if "Copy complete." in notices[-1]:\n' +
      '37:    print("👍🏻")\n' +
      '38:  else:\n' +
      '39:    print("👎🏻")\n' +
      '40:  print("---")\n' +
      '41:  print("\\n".join(notices))\n' +
      '</code></pre>\n' +
      '<p>The bulk of this script was taken from <a href="http://www.leancrew.com/all-this/2014/05/a-slightly-better-superduper-summary/">the predecessor to my AnyBar script</a>, which I wrote for <a href="https://www.tynsoe.org/v2/geektool/">GeekTool</a>.<sup id="fnref:geek"><a href="#fn:geek" rel="footnote">2</a></sup> It reads through the long SuperDuper log file and plucks out just the lines of interest, putting them in the list <code>notices</code>.</p>\n' +
      '<p>The last section, Lines 36–41, looks at the last item in <code>notices</code> to see if the backup finished. If it did, it prints a 👍🏻; if not, it prints a 👎🏻. Then comes the <code>---</code> separator in Line 40 to divide the menu title from the stuff in the dropdown. Finally, all the items in <code>notices</code> are printed line by line to populate the menu itself.</p>\n' +
      '<p>The library plugin, <code>library.3h.py</code>, consists of the following Python code, most of which was copied from <a href="http://www.leancrew.com/all-this/2009/03/library-loan-tracking-again/">an old script</a> that sends me a daily email with the status of the family library accounts.</p>\n' +
      '<pre><code>python:\n' +
      '  1:  #!/usr/bin/python3\n' +
      '  2:  \n' +
      '  3:  import mechanize\n' +
      '  4:  from bs4 import BeautifulSoup\n' +
      '  5:  from datetime import timedelta, datetime\n' +
      '  6:  import re\n' +
      '  7:  import textwrap\n' +
      '  8:  \n' +
      '  9:  # Family library cards\n' +
      ' 10:  cardList = [\n' +
      " 11:  {'patron' : 'Dad',  'code' : '12345678901234', 'pin' : '1234'},\n" +
      " 12:  {'patron' : 'Mom', 'code' : '98765432109876', 'pin' : '9876'},\n" +
      " 13:  {'patron' : 'Son1',   'code' : '91827364555555', 'pin' : '4321'},\n" +
      " 14:  {'patron' : 'Son2',  'code' : '11223344556677', 'pin' : '5678'}]\n" +
      ' 15:  \n' +
      ' 16:  \n' +
      " 17:  # The login URL for the library's account information.\n" +
      " 18:  lURL = 'https://library.naperville-lib.org/iii/cas/login?service=https%3A%2F%2Flibrary.naperville-lib.org%3A443%2Fpatroninfo~S1%2FIIITICKET&amp;scope=1'\n" +
      ' 19:  \n' +
      ' 20:  # Initialize the lists of checked-out and on-hold items.\n' +
      ' 21:  checkedOut = []\n' +
      ' 22:  onHold = []\n' +
      ' 23:  \n' +
      ' 24:  # Dates to compare with due dates. "Soon" is 2 days from today.\n' +
      ' 25:  today = datetime.now()\n' +
      ' 26:  soon = datetime.now() + timedelta(2)\n' +
      ' 27:  \n' +
      ' 28:  # Function that returns a truncated string\n' +
      ' 29:  def shortened(s, length=30):\n' +
      ' 30:    try:\n' +
      " 31:      out = s[:s.index(' / ')]\n" +
      ' 32:    except ValueError:\n' +
      ' 33:      out = s\n' +
      ' 34:    out = out.strip()\n' +
      ' 35:    lines = textwrap.wrap(out, width=length)\n' +
      ' 36:    if len(lines) &gt; 1:\n' +
      " 37:      return lines[0] + '…'\n" +
      ' 38:    else:\n' +
      ' 39:      return out\n' +
      ' 40:  \n' +
      ' 41:  # Go through each card, collecting the lists of items.\n' +
      ' 42:  for card in cardList:\n' +
      ' 43:    # Open a browser and login\n' +
      ' 44:    br = mechanize.Browser()\n' +
      ' 45:    br.set_handle_robots(False)\n' +
      ' 46:    br.open(lURL)\n' +
      ' 47:    br.select_form(nr=0)\n' +
      " 48:    br.form['code'] = card['code']\n" +
      " 49:    br.form['pin'] = card['pin']\n" +
      ' 50:    br.submit()\n' +
      ' 51:  \n' +
      " 52:    # We're now on either the page for checked-out items or for holds.\n" +
      " 53:    # Get the URL and figure out which page we're on.\n" +
      ' 54:    pURL = br.response().geturl()\n' +
      " 55:    if pURL[-5:] == 'items':                            # checked-out items\n" +
      ' 56:      cHtml = br.response().read()                        # get the HTML\n' +
      " 57:      br.follow_link(text_regex='requests? \\(holds?\\)')   # go to holds\n" +
      ' 58:      hHtml = br.response().read()                        # get the HTML\n' +
      " 59:    elif pURL[-5:] == 'holds':                          # holds\n" +
      ' 60:      hHtml = hHtml = br.response().read()                # get the HTML\n' +
      " 61:      br.follow_link(text_regex='currently checked out')  # go to checked-out\n" +
      ' 62:      cHtml = br.response().read()                        # get the HTML\n' +
      ' 63:    else:\n' +
      ' 64:      continue\n' +
      ' 65:  \n' +
      ' 66:    # Parse the HTML.\n' +
      ' 67:    cSoup = BeautifulSoup(cHtml, features="html5lib")\n' +
      ' 68:    hSoup = BeautifulSoup(hHtml, features="html5lib")\n' +
      ' 69:  \n' +
      ' 70:    # Collect the table rows that contain the items.\n' +
      " 71:    loans = cSoup.findAll('tr', {'class' : 'patFuncEntry'})\n" +
      " 72:    holds = hSoup.findAll('tr', {'class' : 'patFuncEntry'})\n" +
      ' 73:  \n' +
      ' 74:    # Due dates and pickup dates are of the form mm-dd-yy.\n' +
      " 75:    itemDate = re.compile(r'\\d\\d-\\d\\d-\\d\\d')\n" +
      ' 76:  \n' +
      ' 77:    # Go through each row of checked out items, keeping only the title and due date.\n' +
      ' 78:    for item in loans:\n' +
      ' 79:      # The title is everything before the spaced slash in the patFuncTitle\n' +
      ' 80:      # string. Some titles have a patFuncVol span after the title string;\n' +
      ' 81:      # that gets filtered out by contents[0]. Interlibrary loans\n' +
      " 82:      # don't appear as links, so there's no &lt;a&gt;&lt;/a&gt; inside the patFuncTitle\n" +
      ' 83:      # item.\n' +
      " 84:      title = item.find('td', {'class' : 'patFuncTitle'}).text\n" +
      ' 85:  \n' +
      ' 86:      # The due date is somewhere in the patFuncStatus cell.\n' +
      " 87:      dueString = itemDate.findall(item.find('td', {'class' : 'patFuncStatus'}).contents[0])[0]\n" +
      " 88:      due = datetime.strptime(dueString, '%m-%d-%y')\n" +
      ' 89:      # Add the item to the checked out list. Arrange tuple so items\n' +
      ' 90:      # get sorted by due date.\n' +
      " 91:      checkedOut.append((due, card['patron'], title))\n" +
      ' 92:  \n' +
      ' 93:    # Go through each row of holds, keeping only the title and place in line.\n' +
      ' 94:    for item in holds:\n' +
      ' 95:      # Again, the title is everything before the spaced slash. Interlibrary loans\n' +
      " 96:      # are holds that don't appear as links, so there's no &lt;a&gt;&lt;/a&gt; inside the\n" +
      ' 97:      # patFuncTitle item.\n' +
      " 98:      title = item.find('td', {'class' : 'patFuncTitle'}).text\n" +
      ' 99:  \n' +
      "100:      # The book's status in the hold queue will be either:\n" +
      "101:      # 1. 'n of m holds'\n" +
      "102:      # 2. 'Ready. Must be picked up by mm-dd-yy' (obsolete?)\n" +
      "103:      # 3. 'DUE mm-dd-yy'\n" +
      "104:      # 4. 'IN TRANSIT'\n" +
      "105:      status = item.find('td', {'class' : 'patFuncStatus'}).contents[0].strip()\n" +
      '106:      n = status.split()[0]\n' +
      '107:      if n.isdigit():                         # possibility 1\n' +
      '108:        n = int(n)\n' +
      "109:        status = status.replace(' holds', '')\n" +
      "110:      elif n[:5].lower() == 'ready' or n[:3].lower() == 'due':  # possibilities 2 &amp; 3\n" +
      '111:        n = -1\n' +
      '112:        readyString = itemDate.findall(status)[0]\n' +
      "113:        ready = datetime.strptime(readyString, '%m-%d-%y')\n" +
      "114:        status = 'Ready&lt;br/&gt; ' + ready.strftime('%b %d')\n" +
      '115:      else:                                   # possibility 4\n' +
      '116:        n = 0\n' +
      '117:  \n' +
      '118:      # Add the item to the on hold list. Arrange tuple so items\n' +
      '119:      # get sorted by position in queue. The position is faked for\n' +
      '120:      # items ready for pickup and in transit within the library.\n' +
      "121:      onHold.append((n, card['patron'], title, status))\n" +
      '122:  \n' +
      '123:  \n' +
      '124:  # Sort the lists.\n' +
      '125:  checkedOut.sort()\n' +
      '126:  onHold.sort()\n' +
      '127:  \n' +
      '128:  # Assemble the information for the menu\n' +
      '129:  checkedAlert = False\n' +
      '130:  holdAlert = False\n' +
      '131:  checkedLines = []\n' +
      '132:  holdLines = []\n' +
      '133:  for item in checkedOut:\n' +
      "134:    suffix = ''\n" +
      '135:    if item[0] &lt;= soon:\n' +
      `136:      suffix = f'|href="{lURL}"'\n` +
      '137:      checkedAlert = True\n' +
      "138:    checkedLines.append(item[0].strftime('--%b %-d  ') + shortened(item[2]) + suffix)\n" +
      '139:  for item in onHold:\n' +
      "140:    suffix = ''\n" +
      '141:    if "Ready" in item[3]:\n' +
      "142:      suffix = '|color=#700000'\n" +
      '143:      holdAlert = True\n' +
      "144:    holdLines.append('--' + shortened(item[2]) + suffix)\n" +
      '145:  \n' +
      '146:  # Print the information in BitBar format\n' +
      '147:  if checkedAlert or holdAlert:\n' +
      "148:    print('📕')\n" +
      '149:  else:\n' +
      "150:    print('📘')\n" +
      "151:  print('---')\n" +
      '152:  if checkedAlert:\n' +
      "153:    print('Checked out|color=#CC0000')\n" +
      '154:  else:\n' +
      "155:    print('Checked out')\n" +
      "156:  print('\\n'.join(checkedLines))\n" +
      '157:  if holdAlert:\n' +
      "158:    print('Holds|color=#700000')\n" +
      '159:  else:\n' +
      "160:    print('Holds')\n" +
      "161:  print('\\n'.join(holdLines))\n" +
      '</code></pre>\n' +
      '<p>The BitBar-specific stuff starts on Line 128. It’s more complicated than the SuperDuper script, in that:</p>\n' +
      '<ul>\n' +
      '<li>The character used for the menu title is based on two criteria instead of just one.</li>\n' +
      '<li>It has submenus, the items of which are distinguished by a <code>--</code> prefix.</li>\n' +
      '<li>It uses the <code>|color=#700000</code> suffix to make overdue or ready items red. I’ve found BitBar’s coloring of items somewhat sketchy. Often the items start off black and don’t turn red until I’ve moved the mouse over them, away from them, and then back over them again.</li>\n' +
      '<li>It uses the <code>|href=</code> suffix to enable the menu item and cause Safari to open the given URL when chosen.</li>\n' +
      '</ul>\n' +
      '<p>Still, there’s not much to the BitBar part of either of these scripts. Now I’m wondering what other informational scripts I have that can be converted into BitBar form.</p>\n' +
      '<div class="footnotes">\n' +
      '<hr/>\n' +
      '<ol>\n' +
      '<li id="fn:nero">\n' +
      '<p>No, the Nero Wolfe video wasn’t actually overdue. Because of the pandemic, our library quarantines returned items for a few days before updating their status in the system and reshelving. So until the Current Situation is over, this notice will be red more than it should be. <a href="#fnref:nero" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '<li id="fn:geek">\n' +
      '<p>Seems longer than six years since I used GeekTool; I stopped because I usually have too many windows open to see information written on the desktop. <a href="#fnref:geek" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/bitbar-superduper-and-library-books/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'Jason Snell’s recent post on BitBar inspired me to build a couple of menu bar notices of my own.\n' +
      'The first was a rewrite of the SuperDuper notice I used to use with a similar menu bar utility called AnyBar. It puts a thumbs up in the menu bar if the most recent scheduled SuperDuper backup was successful, and a thumbs down if it wasn’t. Clicking on the item brings up a summary of SuperDuper’s log file:\n' +
      '\n' +
      'The log summary is in gray text because it doesn’t do anything—it’s like a series of disabled menu items.\n' +
      'The second BitBar notice is a little more complicated. It gets the status of items my family has checked out or on hold at our local library and presents them in the menu. If a checked-out item is due soon (or overdue) or if an item on hold is ready to be picked up, the book item in the menu bar is red; otherwise, it’s blue. Either way, the items are listed in the submenus.1\n' +
      '\n' +
      'In addition to the submenus, this one also allows some items in the menu to be chosen. If an item is due soon, it will be enabled in the menu, and choosing it will open Safari to the library’s login page. This speeds up renewing a book if I want to keep it longer.\n' +
      'BitBar uses the daunting words “plugin” and “API” to describe the code that configures these menu bar items, but they’re just programs that write lines of text to standard output. If you’ve ever written any kind of program in any language, you can write a BitBar plugin. There are several rules for the output, but the main ones are:\n' +
      'Multiple lines will be cycled through over and over.\n' +
      'If your output contains a line consisting only of ---, the lines below it will appear in the dropdown for that plugin, but won’t appear in the menu bar itself.\n' +
      'Lines beginning with -- will appear in submenus.\n' +
      'You save the programs in a folder that you set up when you run BitBar the first time (before you have any plugins written). I use ~/.bitbar.\n' +
      'My SuperDuper plugin, named superduper.6h.py in accordance with the BitBar plugin naming format, is this Python script:\n' +
      'python:\n' +
      ' 1:  #!/usr/bin/python3\n' +
      ' 2:  \n' +
      ' 3:  import os\n' +
      ' 4:  \n' +
      ' 5:  # Where the SuperDuper! log files are.\n' +
      ' 6:  logdir = (os.environ["HOME"] +\n' +
      ' 7:            "/Library/Application Support/" +\n' +
      ' 8:            "SuperDuper!/Scheduled Copies/" +\n' +
      ' 9:            "Smart Update Backup from Macintosh HD.sdsp/Logs/")\n' +
      '10:  \n' +
      '11:  def sdinfo(s):\n' +
      '12:    "Return just the timestamp and process information from a SuperDuper line."\n' +
      "13:    parts = s.split('|')\n" +
      '14:    ratespot = parts[3].find("at an effective transfer rate")\n' +
      '15:    if ratespot > -1:\n' +
      '16:      parts[3] = parts[3][:ratespot]\n' +
      '17:    detailspot = parts[3].find("(")\n' +
      '18:    if detailspot > -1:\n' +
      '19:      parts[3] = parts[3][:detailspot]\n' +
      `20:    return "%s: %s" % (parts[1].strip(), parts[3].strip(' \\\\\\n'))\n` +
      '21:  \n' +
      '22:  # Get the last log file.\n' +
      "23:  logfiles = [x for x in os.listdir(logdir) if x[-5:] == 'sdlog']\n" +
      '24:  logfiles.sort()\n' +
      '25:  lastlog = logdir + logfiles[-1]\n' +
      '26:  \n' +
      '27:  # Collect data for BitBar\n' +
      '28:  notices = []\n' +
      '29:  with open(lastlog) as f:\n' +
      '30:    for line in f:\n' +
      '31:      for signal in ["Started on", "PHASE:", "Copied", "Cloned", "Copy complete"]:\n' +
      '32:          if signal in line:\n' +
      '33:            notices.append(sdinfo(line))\n' +
      '34:  \n' +
      '35:  # Format output for BitBar\n' +
      '36:  if "Copy complete." in notices[-1]:\n' +
      '37:    print("👍🏻")\n' +
      '38:  else:\n' +
      '39:    print("👎🏻")\n' +
      '40:  print("---")\n' +
      '41:  print("\\n".join(notices))\n' +
      '\n' +
      'The bulk of this script was taken from the predecessor to my AnyBar script, which I wrote for GeekTool.2 It reads through the long SuperDuper log file and plucks out just the lines of interest, putting them in the list notices.\n' +
      'The last section, Lines 36–41, looks at the last item in notices to see if the backup finished. If it did, it prints a 👍🏻; if not, it prints a 👎🏻. Then comes the --- separator in Line 40 to divide the menu title from the stuff in the dropdown. Finally, all the items in notices are printed line by line to populate the menu itself.\n' +
      'The library plugin, library.3h.py, consists of the following Python code, most of which was copied from an old script that sends me a daily email with the status of the family library accounts.\n' +
      'python:\n' +
      '  1:  #!/usr/bin/python3\n' +
      '  2:  \n' +
      '  3:  import mechanize\n' +
      '  4:  from bs4 import BeautifulSoup\n' +
      '  5:  from datetime import timedelta, datetime\n' +
      '  6:  import re\n' +
      '  7:  import textwrap\n' +
      '  8:  \n' +
      '  9:  # Family library cards\n' +
      ' 10:  cardList = [\n' +
      " 11:  {'patron' : 'Dad',  'code' : '12345678901234', 'pin' : '1234'},\n" +
      " 12:  {'patron' : 'Mom', 'code' : '98765432109876', 'pin' : '9876'},\n" +
      " 13:  {'patron' : 'Son1',   'code' : '91827364555555', 'pin' : '4321'},\n" +
      " 14:  {'patron' : 'Son2',  'code' : '11223344556677', 'pin' : '5678'}]\n" +
      ' 15:  \n' +
      ' 16:  \n' +
      " 17:  # The login URL for the library's account information.\n" +
      " 18:  lURL = 'https://library.naperville-lib.org/iii/cas/login?service=https%3A%2F%2Flibrary.naperville-lib.org%3A443%2Fpatroninfo~S1%2FIIITICKET&scope=1'\n" +
      ' 19:  \n' +
      ' 20:  # Initialize the lists of checked-out and on-hold items.\n' +
      ' 21:  checkedOut = []\n' +
      ' 22:  onHold = []\n' +
      ' 23:  \n' +
      ' 24:  # Dates to compare with due dates. "Soon" is 2 days from today.\n' +
      ' 25:  today = datetime.now()\n' +
      ' 26:  soon = datetime.now() + timedelta(2)\n' +
      ' 27:  \n' +
      ' 28:  # Function that returns a truncated string\n' +
      ' 29:  def shortened(s, length=30):\n' +
      ' 30:    try:\n' +
      " 31:      out = s[:s.index(' / ')]\n" +
      ' 32:    except ValueError:\n' +
      ' 33:      out = s\n' +
      ' 34:    out = out.strip()\n' +
      ' 35:    lines = textwrap.wrap(out, width=length)\n' +
      ' 36:    if len(lines) > 1:\n' +
      " 37:      return lines[0] + '…'\n" +
      ' 38:    else:\n' +
      ' 39:      return out\n' +
      ' 40:  \n' +
      ' 41:  # Go through each card, collecting the lists of items.\n' +
      ' 42:  for card in cardList:\n' +
      ' 43:    # Open a browser and login\n' +
      ' 44:    br = mechanize.Browser()\n' +
      ' 45:    br.set_handle_robots(False)\n' +
      ' 46:    br.open(lURL)\n' +
      ' 47:    br.select_form(nr=0)\n' +
      " 48:    br.form['code'] = card['code']\n" +
      " 49:    br.form['pin'] = card['pin']\n" +
      ' 50:    br.submit()\n' +
      ' 51:  \n' +
      " 52:    # We're now on either the page for checked-out items or for holds.\n" +
      " 53:    # Get the URL and figure out which page we're on.\n" +
      ' 54:    pURL = br.response().geturl()\n' +
      " 55:    if pURL[-5:] == 'items':                            # checked-out items\n" +
      ' 56:      cHtml = br.response().read()                        # get the HTML\n' +
      " 57:      br.follow_link(text_regex='requests? \\(holds?\\)')   # go to holds\n" +
      ' 58:      hHtml = br.response().read()                        # get the HTML\n' +
      " 59:    elif pURL[-5:] == 'holds':                          # holds\n" +
      ' 60:      hHtml = hHtml = br.response().read()                # get the HTML\n' +
      " 61:      br.follow_link(text_regex='currently checked out')  # go to checked-out\n" +
      ' 62:      cHtml = br.response().read()                        # get the HTML\n' +
      ' 63:    else:\n' +
      ' 64:      continue\n' +
      ' 65:  \n' +
      ' 66:    # Parse the HTML.\n' +
      ' 67:    cSoup = BeautifulSoup(cHtml, features="html5lib")\n' +
      ' 68:    hSoup = BeautifulSoup(hHtml, features="html5lib")\n' +
      ' 69:  \n' +
      ' 70:    # Collect the table rows that contain the items.\n' +
      " 71:    loans = cSoup.findAll('tr', {'class' : 'patFuncEntry'})\n" +
      " 72:    holds = hSoup.findAll('tr', {'class' : 'patFuncEntry'})\n" +
      ' 73:  \n' +
      ' 74:    # Due dates and pickup dates are of the form mm-dd-yy.\n' +
      " 75:    itemDate = re.compile(r'\\d\\d-\\d\\d-\\d\\d')\n" +
      ' 76:  \n' +
      ' 77:    # Go through each row of checked out items, keeping only the title and due date.\n' +
      ' 78:    for item in loans:\n' +
      ' 79:      # The title is everything before the spaced slash in the patFuncTitle\n' +
      ' 80:      # string. Some titles have a patFuncVol span after the title string;\n' +
      ' 81:      # that gets filtered out by contents[0]. Interlibrary loans\n' +
      " 82:      # don't appear as links, so there's no <a></a> inside the patFuncTitle\n" +
      ' 83:      # item.\n' +
      " 84:      title = item.find('td', {'class' : 'patFuncTitle'}).text\n" +
      ' 85:  \n' +
      ' 86:      # The due date is somewhere in the patFuncStatus cell.\n' +
      " 87:      dueString = itemDate.findall(item.find('td', {'class' : 'patFuncStatus'}).contents[0])[0]\n" +
      " 88:      due = datetime.strptime(dueString, '%m-%d-%y')\n" +
      ' 89:      # Add the item to the checked out list. Arrange tuple so items\n' +
      ' 90:      # get sorted by due date.\n' +
      " 91:      checkedOut.append((due, card['patron'], title))\n" +
      ' 92:  \n' +
      ' 93:    # Go through each row of holds, keeping only the title and place in line.\n' +
      ' 94:    for item in holds:\n' +
      ' 95:      # Again, the title is everything before the spaced slash. Interlibrary loans\n' +
      " 96:      # are holds that don't appear as links, so there's no <a></a> inside the\n" +
      ' 97:      # patFuncTitle item.\n' +
      " 98:      title = item.find('td', {'class' : 'patFuncTitle'}).text\n" +
      ' 99:  \n' +
      "100:      # The book's status in the hold queue will be either:\n" +
      "101:      # 1. 'n of m holds'\n" +
      "102:      # 2. 'Ready. Must be picked up by mm-dd-yy' (obsolete?)\n" +
      "103:      # 3. 'DUE mm-dd-yy'\n" +
      "104:      # 4. 'IN TRANSIT'\n" +
      "105:      status = item.find('td', {'class' : 'patFuncStatus'}).contents[0].strip()\n" +
      '106:      n = status.split()[0]\n' +
      '107:      if n.isdigit():                         # possibility 1\n' +
      '108:        n = int(n)\n' +
      "109:        status = status.replace(' holds', '')\n" +
      "110:      elif n[:5].lower() == 'ready' or n[:3].lower() == 'due':  # possibilities 2 & 3\n" +
      '111:        n = -1\n' +
      '112:        readyString = itemDate.findall(status)[0]\n' +
      "113:        ready = datetime.strptime(readyString, '%m-%d-%y')\n" +
      "114:        status = 'Ready<br/> ' + ready.strftime('%b %d')\n" +
      '115:      else:                                   # possibility 4\n' +
      '116:        n = 0\n' +
      '117:  \n' +
      '118:      # Add the item to the on hold list. Arrange tuple so items\n' +
      '119:      # get sorted by position in queue. The position is faked for\n' +
      '120:      # items ready for pickup and in transit within the library.\n' +
      "121:      onHold.append((n, card['patron'], title, status))\n" +
      '122:  \n' +
      '123:  \n' +
      '124:  # Sort the lists.\n' +
      '125:  checkedOut.sort()\n' +
      '126:  onHold.sort()\n' +
      '127:  \n' +
      '128:  # Assemble the information for the menu\n' +
      '129:  checkedAlert = False\n' +
      '130:  holdAlert = False\n' +
      '131:  checkedLines = []\n' +
      '132:  holdLines = []\n' +
      '133:  for item in checkedOut:\n' +
      "134:    suffix = ''\n" +
      '135:    if item[0] <= soon:\n' +
      `136:      suffix = f'|href="{lURL}"'\n` +
      '137:      checkedAlert = True\n' +
      "138:    checkedLines.append(item[0].strftime('--%b %-d  ') + shortened(item[2]) + suffix)\n" +
      '139:  for item in onHold:\n' +
      "140:    suffix = ''\n" +
      '141:    if "Ready" in item[3]:\n' +
      "142:      suffix = '|color=#700000'\n" +
      '143:      holdAlert = True\n' +
      "144:    holdLines.append('--' + shortened(item[2]) + suffix)\n" +
      '145:  \n' +
      '146:  # Print the information in BitBar format\n' +
      '147:  if checkedAlert or holdAlert:\n' +
      "148:    print('📕')\n" +
      '149:  else:\n' +
      "150:    print('📘')\n" +
      "151:  print('---')\n" +
      '152:  if checkedAlert:\n' +
      "153:    print('Checked out|color=#CC0000')\n" +
      '154:  else:\n' +
      "155:    print('Checked out')\n" +
      "156:  print('\\n'.join(checkedLines))\n" +
      '157:  if holdAlert:\n' +
      "158:    print('Holds|color=#700000')\n" +
      '159:  else:\n' +
      "160:    print('Holds')\n" +
      "161:  print('\\n'.join(holdLines))\n" +
      '\n' +
      'The BitBar-specific stuff starts on Line 128. It’s more complicated than the SuperDuper script, in that:\n' +
      'The character used for the menu title is based on two criteria instead of just one.\n' +
      'It has submenus, the items of which are distinguished by a -- prefix.\n' +
      'It uses the |color=#700000 suffix to make overdue or ready items red. I’ve found BitBar’s coloring of items somewhat sketchy. Often the items start off black and don’t turn red until I’ve moved the mouse over them, away from them, and then back over them again.\n' +
      'It uses the |href= suffix to enable the menu item and cause Safari to open the given URL when chosen.\n' +
      'Still, there’s not much to the BitBar part of either of these scripts. Now I’m wondering what other informational scripts I have that can be converted into BitBar form.\n' +
      'No, the Nero Wolfe video wasn’t actually overdue. Because of the pandemic, our library quarantines returned items for a few days before updating their status in the system and reshelving. So until the Current Situation is over, this notice will be red more than it should be. ↩\n' +
      'Seems longer than six years since I used GeekTool; I stopped because I usually have too many windows open to see information written on the desktop. ↩\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  Jason Snell’s <a href="https://sixcolors.com/post/2020/08/put-anything-in-your-macs-menu-bar-with-bitbar/">recent post</a> on <a href="https://github.com/matryer/bitbar">BitBar</a> inspired me to build a couple of menu bar notices of my own.\n',
    contentSnippet: 'Jason Snell’s recent post on BitBar inspired me to build a couple of menu bar notices of my own.',
    guid: 'https://leancrew.com/all-this/2020/08/bitbar-superduper-and-library-books/',
    isoDate: '2020-08-23T20:57:19.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'Epic relief',
    link: 'https://leancrew.com/all-this/2020/08/epic-relief/',
    pubDate: 'Tue, 18 Aug 2020 12:42:26 +0000',
    'content:encoded': '\n' +
      '  <p>One of the great things about not being—or having aspirations of being—a professional Apple blogger is that there’s no compulsion to write about every Apple story that pops up. I was reminded of this a few days ago when the Apple/Epic war broke out. As my RSS reader filled with links and summaries and hot takes, a wave of relief washed over me. It was like seeing that my grades on the midterms and homework were good enough that I didn’t have to take the final exam.</p>\n' +
      '<p>Mind you, it’s not that I have no opinions. My chief opinion is that I should update my <a href="https://leancrew.com/all-this/2015/11/simpler-syndication/">homemade feedreading system</a> to give me a faster way to delete tedious entries.</p>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/epic-relief/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'One of the great things about not being—or having aspirations of being—a professional Apple blogger is that there’s no compulsion to write about every Apple story that pops up. I was reminded of this a few days ago when the Apple/Epic war broke out. As my RSS reader filled with links and summaries and hot takes, a wave of relief washed over me. It was like seeing that my grades on the midterms and homework were good enough that I didn’t have to take the final exam.\n' +
      'Mind you, it’s not that I have no opinions. My chief opinion is that I should update my homemade feedreading system to give me a faster way to delete tedious entries.\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  One of the great things about not being—or having aspirations of being—a professional Apple blogger is that there’s no compulsion to write about every Apple story that pops up. I was reminded of this a few days ago when the Apple/Epic war broke out. As my RSS reader filled with links and summaries and hot takes, a wave of relief washed over me. It was like seeing that my grades on the midterms and homework were good enough that I didn’t have to take the final exam.\n',
    contentSnippet: 'One of the great things about not being—or having aspirations of being—a professional Apple blogger is that there’s no compulsion to write about every Apple story that pops up. I was reminded of this a few days ago when the Apple/Epic war broke out. As my RSS reader filled with links and summaries and hot takes, a wave of relief washed over me. It was like seeing that my grades on the midterms and homework were good enough that I didn’t have to take the final exam.',
    guid: 'https://leancrew.com/all-this/2020/08/epic-relief/',
    isoDate: '2020-08-18T12:42:26.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'Apple Watch settings',
    link: 'https://leancrew.com/all-this/2020/08/apple-watch-settings/',
    pubDate: 'Fri, 14 Aug 2020 13:49:19 +0000',
    'content:encoded': '\n' +
      '  <p><a href="https://leancrew.com/all-this/2020/08/dear-apple/">Recently</a>, I had some trouble with my Apple Watch and had to unpair/re-pair it. In the process, the watch’s settings were lost. I was reminded of this yesterday when I crossed my arms and the watch announced the time. After Googling for the way to stop that, I decided to make a Note to accumulate all the settings I’ve used to get the watch working the way I want.</p>\n' +
      '<p>The crossed-arm problem is solved by turning off the Speak Time setting in the Watch app’s Clock section.</p>\n' +
      '<p><img alt="Speak Time setting" class="ss" src="https://leancrew.com/all-this/images2020/20200814-Speak%20Time%20setting.jpg" title="Speak Time setting" width="50%"/></p>\n' +
      '<p>It’s not that I’m actually putting two fingers on the watch face, but something about the way my right arm touches the face when I cross my arms sets this off. Since I have never deliberately used this feature to get the watch to announce the time, turning it off is an easy call.</p>\n' +
      '<p>After turning off Speak Time, I remembered that I missed a phone call earlier in the day, presumably because my watch didn’t alert me (my phone is always on silent). In this case, I actually remembered the setting that allows me to mute the watch accidentally. It’s the Cover to Mute setting in Sound &amp; Haptics.</p>\n' +
      '<p><img alt="Cover to Mute setting" class="ss" src="https://leancrew.com/all-this/images2020/20200814-Cover%20to%20Mute%20setting.jpg" title="Cover to Mute setting" width="50%"/></p>\n' +
      '<p>Again, I’ve never muted my watch on purpose by covering its face, but I’ve done it inadvertently many times. A couple of years ago, this happened so often I thought someone was gaslighting me. Whenever I learned that I’d missed an alert, I checked the settings to find that Silent Mode was on. It was months before I realized that Cover to Mute wasn’t a temporary thing to silence a single alert, but a permanent switch to Silent Mode. I still think the description of how it works is poorly worded.</p>\n' +
      '<p>Anyway, I’m sure that more of these will come up over the next few weeks, as I find my watch alerting me when I don’t want it to and not alerting me when I do. Whenever I figure out the fix, I’ll take a screenshot and add it to my Apple Watch Settings note.</p>\n' +
      '<p><img alt="Apple Watch Settings note" class="ss" src="https://leancrew.com/all-this/images2020/20200814-Apple%20Watch%20Settings%20note.jpg" title="Apple Watch Settings note" width="50%"/></p>\n' +
      '<p>I decided to make the images small (tap and hold on an image and choose Small Images from the popup menu) because I think the text alone will usually be enough to remind me of what I need to do.</p>\n' +
      '<div class="update">\n' +
      '<p><strong>Update Aug 14, 2020 8:57 AM</strong>  \n' +
      'Not five minutes after publishing, I got one of those stupid “You’re doing great! Keep it up!” notifications. So I’ve added turning off the Daily Coaching setting to my note.</p>\n' +
      '<p><img alt="Daily Coaching" class="ss" src="https://leancrew.com/all-this/images2020/20200814-Daily%20Coaching.jpg" title="Daily Coaching" width="50%"/></p>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/apple-watch-settings/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'Recently, I had some trouble with my Apple Watch and had to unpair/re-pair it. In the process, the watch’s settings were lost. I was reminded of this yesterday when I crossed my arms and the watch announced the time. After Googling for the way to stop that, I decided to make a Note to accumulate all the settings I’ve used to get the watch working the way I want.\n' +
      'The crossed-arm problem is solved by turning off the Speak Time setting in the Watch app’s Clock section.\n' +
      '\n' +
      'It’s not that I’m actually putting two fingers on the watch face, but something about the way my right arm touches the face when I cross my arms sets this off. Since I have never deliberately used this feature to get the watch to announce the time, turning it off is an easy call.\n' +
      'After turning off Speak Time, I remembered that I missed a phone call earlier in the day, presumably because my watch didn’t alert me (my phone is always on silent). In this case, I actually remembered the setting that allows me to mute the watch accidentally. It’s the Cover to Mute setting in Sound & Haptics.\n' +
      '\n' +
      'Again, I’ve never muted my watch on purpose by covering its face, but I’ve done it inadvertently many times. A couple of years ago, this happened so often I thought someone was gaslighting me. Whenever I learned that I’d missed an alert, I checked the settings to find that Silent Mode was on. It was months before I realized that Cover to Mute wasn’t a temporary thing to silence a single alert, but a permanent switch to Silent Mode. I still think the description of how it works is poorly worded.\n' +
      'Anyway, I’m sure that more of these will come up over the next few weeks, as I find my watch alerting me when I don’t want it to and not alerting me when I do. Whenever I figure out the fix, I’ll take a screenshot and add it to my Apple Watch Settings note.\n' +
      '\n' +
      'I decided to make the images small (tap and hold on an image and choose Small Images from the popup menu) because I think the text alone will usually be enough to remind me of what I need to do.\n' +
      'Update Aug 14, 2020 8:57 AM  \n' +
      'Not five minutes after publishing, I got one of those stupid “You’re doing great! Keep it up!” notifications. So I’ve added turning off the Daily Coaching setting to my note.\n' +
      '\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  <a href="https://leancrew.com/all-this/2020/08/dear-apple/">Recently</a>, I had some trouble with my Apple Watch and had to unpair/re-pair it. In the process, the watch’s settings were lost. I was reminded of this yesterday when I crossed my arms and the watch announced the time. After Googling for the way to stop that, I decided to make a Note to accumulate all the settings I’ve used to get the watch working the way I want.\n',
    contentSnippet: 'Recently, I had some trouble with my Apple Watch and had to unpair/re-pair it. In the process, the watch’s settings were lost. I was reminded of this yesterday when I crossed my arms and the watch announced the time. After Googling for the way to stop that, I decided to make a Note to accumulate all the settings I’ve used to get the watch working the way I want.',
    guid: 'https://leancrew.com/all-this/2020/08/apple-watch-settings/',
    isoDate: '2020-08-14T13:49:19.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'Deep insight',
    link: 'https://leancrew.com/all-this/2020/08/deep-insight/',
    pubDate: 'Wed, 12 Aug 2020 03:37:56 +0000',
    'content:encoded': '\n' +
      '  <p>Literally the last sentence in <a href="https://www.zdnet.com/article/mozilla-lays-off-250-employees-while-it-refocuses-on-commercial-products/">this article</a> about Mozilla laying off a quarter of its employees:</p>\n' +
      '<blockquote>\n' +
      '<p>The Google deal has historically accounted for around 90% of all of Mozilla’s revenue, and without it experts see a dim future for Mozilla past 2021.</p>\n' +
      '</blockquote>\n' +
      '<p>First: I thought news articles were supposed to be “inverted pyramid,” not “pyramid.”</p>\n' +
      '<p>Second: Nothing gets past those experts, does it?</p>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/deep-insight/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'Literally the last sentence in this article about Mozilla laying off a quarter of its employees:\n' +
      'The Google deal has historically accounted for around 90% of all of Mozilla’s revenue, and without it experts see a dim future for Mozilla past 2021.\n' +
      'First: I thought news articles were supposed to be “inverted pyramid,” not “pyramid.”\n' +
      'Second: Nothing gets past those experts, does it?\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  Literally the last sentence in <a href="https://www.zdnet.com/article/mozilla-lays-off-250-employees-while-it-refocuses-on-commercial-products/">this article</a> about Mozilla laying off a quarter of its employees:\n',
    contentSnippet: 'Literally the last sentence in this article about Mozilla laying off a quarter of its employees:',
    guid: 'https://leancrew.com/all-this/2020/08/deep-insight/',
    isoDate: '2020-08-12T03:37:56.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'Dear Apple,',
    link: 'https://leancrew.com/all-this/2020/08/dear-apple/',
    pubDate: 'Mon, 10 Aug 2020 18:55:51 +0000',
    'content:encoded': '\n' +
      '  <p>I have been an Apple user for 35 years. Do you have one minute for a little story? Thanks.</p>\n' +
      '<p>I have been trying to install your fucking OS update on my fucking watch for three fucking days now. First, I had to unpair and re-pair it because there wasn’t enough room for the update (even though I have very few apps on my watch). That was the only way to free up space because your storage management is for shit. Then it refused to update overnight despite telling me it was going to (in fairness, this wasn’t surprising—the iPad has been lying about updating itself overnight for ages). Now I’m trying to do the update manually, and I keep getting this fucking message:</p>\n' +
      '<p><img alt="Watch update error message" class="ss" src="https://leancrew.com/all-this/images2020/20200810-Watch%20update%20error%20message.png" title="Watch update error message" width="50%"/></p>\n' +
      '<p>So I deleted the downloaded Software Update so I can try again. Why should this work? I have no idea; it’s like restarting a Windows machine. While I was deleting, I noticed that Music was taking up a lot of space because the fucking Heavy Rotation playlist was turned on again, despite my having turned it off.</p>\n' +
      '<p>You should all be ashamed of yourselves.</p>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/dear-apple/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'I have been an Apple user for 35 years. Do you have one minute for a little story? Thanks.\n' +
      'I have been trying to install your fucking OS update on my fucking watch for three fucking days now. First, I had to unpair and re-pair it because there wasn’t enough room for the update (even though I have very few apps on my watch). That was the only way to free up space because your storage management is for shit. Then it refused to update overnight despite telling me it was going to (in fairness, this wasn’t surprising—the iPad has been lying about updating itself overnight for ages). Now I’m trying to do the update manually, and I keep getting this fucking message:\n' +
      '\n' +
      'So I deleted the downloaded Software Update so I can try again. Why should this work? I have no idea; it’s like restarting a Windows machine. While I was deleting, I noticed that Music was taking up a lot of space because the fucking Heavy Rotation playlist was turned on again, despite my having turned it off.\n' +
      'You should all be ashamed of yourselves.\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  I have been an Apple user for 35 years. Do you have one minute for a little story? Thanks.\n',
    contentSnippet: 'I have been an Apple user for 35 years. Do you have one minute for a little story? Thanks.',
    guid: 'https://leancrew.com/all-this/2020/08/dear-apple/',
    isoDate: '2020-08-10T18:55:51.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'A more handy Warhol',
    link: 'https://leancrew.com/all-this/2020/08/a-more-handy-warhol/',
    pubDate: 'Mon, 10 Aug 2020 14:10:35 +0000',
    'content:encoded': '\n' +
      '  <p>After posting my <a href="https://leancrew.com/all-this/2020/08/development-shortcuts-and-warhol/">Warhol shortcut</a>, I got a couple of good suggestions for improvements. They overlapped to some extent, so I put them together into <a href="https://www.icloud.com/shortcuts/74ccef08af784e78abfe8a4448f8ae9b">a new Warhol</a>.</p>\n' +
      '<p>First, David Sparks pointed out that it would be helpful to end the shortcut by opening Photos so you can both see the new image and do something with it. And Leddy, <a href="https://talk.automators.fm/t/dr-drang-s-warhol-shortcut/7901">in the Automators discussion forum</a>, had a suggestion for running it both the Share Sheet and directly from Shortcuts without running into memory constraints. As I was trying out Leddy’s suggestion, I learned that Warhol <em>wasn’t</em> constrained by memory when run from the Share Sheet. (Apparently I’d run into that problem during one of the the early iterations of Warhol and never went back to check if the later improvements made it efficient enough to avoid the memory constraint.)</p>\n' +
      '<p>So now Warhol can be run from both Shortcuts and the Share Sheet in Photos. If it’s run from Shortcuts, it finishes by opening Photos. If it’s run from the Share Sheet, Photos is already open.</p>\n' +
      '<p>Here are the steps in the improved Warhol:</p>\n' +
      '<table width="100%">\n' +
      '<tr><th>Step</th><th>Action</th><th>Comment</th></tr>\n' +
      '<tr>\n' +
      '<td>0</td>\n' +
      '<td width="50%"><img alt="Warhol Step 00" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2000.png" title="Warhol Step 00" width="100%"/></td>\n' +
      '<td>This would generally be run from the Share Sheet in Photos.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>1</td>\n' +
      '<td width="50%"><img alt="Warhol Step 01" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2001.png" title="Warhol Step 01" width="100%"/></td>\n' +
      '<td>This only works with one image, so if more than that selected, take just the first one.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>2</td>\n' +
      '<td width="50%"><img alt="Warhol Step 02" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2002.png" title="Warhol Step 02" width="100%"/></td>\n' +
      '<td>If this was really run from the Share Sheet, there will be something from the Step 1.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>3</td>\n' +
      '<td width="50%"><img alt="Warhol Step 03" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2003.png" title="Warhol Step 03" width="100%"/></td>\n' +
      '<td>So store that something in <tt>thePhoto</tt> for later use.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>4</td>\n' +
      '<td width="50%"><img alt="Warhol Step 04" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2004.png" title="Warhol Step 04" width="100%"/></td>\n' +
      '<td>If Warhol was run directly from Shortcuts, there’s no photo passed to it, and the output Step 1 is empty.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>5</td>\n' +
      '<td width="50%"><img alt="Warhol Step 05" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2005.png" title="Warhol Step 05" width="100%"/></td>\n' +
      '<td>So ask the user to select an image…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>6</td>\n' +
      '<td width="50%"><img alt="Warhol Step 06" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2006.png" title="Warhol Step 06" width="100%"/></td>\n' +
      '<td>And store that image in <tt>thePhoto</tt>.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>7</td>\n' +
      '<td width="50%"><img alt="Warhol Step 07" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2007.png" title="Warhol Step 07" width="100%"/></td>\n' +
      '<td></td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>8</td>\n' +
      '<td width="50%"><img alt="Warhol Step 08" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2008.png" title="Warhol Step 08" width="100%"/></td>\n' +
      '<td>This is a dictionary of dictionaries, which we’ll use to resize the images and assemble the grid. The keys of the “outer” dictionary are the grid sizes you see in the left column. The keys of the “inner” dictionaries are <tt>count</tt> and <tt>width</tt>.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>9</td>\n' +
      '<td width="50%"><img alt="Warhol Step 09" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2009.png" title="Warhol Step 09" width="100%"/></td>\n' +
      '<td>Put up a menu for choosing the grid size from the dictionary in Step 8.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>10</td>\n' +
      '<td width="50%"><img alt="Warhol Step 10" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2010.png" title="Warhol Step 10" width="100%"/></td>\n' +
      '<td>Resize <tt>thePhoto</tt> to the <tt>width</tt> value from the dictionary item chosen in Step 9.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>11</td>\n' +
      '<td width="50%"><img alt="Warhol Step 11" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2011.png" title="Warhol Step 11" width="100%"/></td>\n' +
      '<td>Ask if the photos in the grid should be tinted.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>12</td>\n' +
      '<td width="50%"><img alt="Warhol Step 12" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2012.png" title="Warhol Step 12" width="100%"/></td>\n' +
      '<td>If yes…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>13</td>\n' +
      '<td width="50%"><img alt="Warhol Step 13" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2013.png" title="Warhol Step 13" width="100%"/></td>\n' +
      '<td>For the number of photos in the grid, which is the <tt>count</tt> value from the dictionary chosen in Step 9…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>14</td>\n' +
      '<td width="50%"><img alt="Warhol Step 14" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2014.png" title="Warhol Step 14" width="100%"/></td>\n' +
      '<td>Select an image at random from the Tints album.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>15</td>\n' +
      '<td width="50%"><img alt="Warhol Step 15" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2015.png" title="Warhol Step 15" width="100%"/></td>\n' +
      '<td>Resize the tint image and overlay it onto the resized version of <tt>thePhoto</tt>. <tt>Width</tt> and <tt>Height</tt> are the width and height of the resized photo. For the opacity of the overlay, I tried several values and landed on 40%. You may prefer something else.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>16</td>\n' +
      '<td width="50%"><img alt="Warhol Step 16" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2016.png" title="Warhol Step 16" width="100%"/></td>\n' +
      '<td>Add the tinted image to the <tt>photos</tt> list.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>17</td>\n' +
      '<td width="50%"><img alt="Warhol Step 17" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2017.png" title="Warhol Step 17" width="100%"/></td>\n' +
      '<td>We’re done assembling the tinted photos.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>18</td>\n' +
      '<td width="50%"><img alt="Warhol Step 18" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2018.png" title="Warhol Step 18" width="100%"/></td>\n' +
      '<td>If no tinting…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>19</td>\n' +
      '<td width="50%"><img alt="Warhol Step 19" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2019.png" title="Warhol Step 19" width="100%"/></td>\n' +
      '<td>For the number of photos in the grid, which is the <tt>count</tt> value from the dictionary chosen in Step 9…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>20</td>\n' +
      '<td width="50%"><img alt="Warhol Step 20" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2020.png" title="Warhol Step 20" width="100%"/></td>\n' +
      '<td>Add the resized version of <tt>thePhoto</tt> to the <tt>photos</tt> list.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>21</td>\n' +
      '<td width="50%"><img alt="Warhol Step 21" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2021.png" title="Warhol Step 21" width="100%"/></td>\n' +
      '<td>We’re done assembling the untinted photos.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>22</td>\n' +
      '<td width="50%"><img alt="Warhol Step 22" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2022.png" title="Warhol Step 22" width="100%"/></td>\n' +
      '<td>We’re done handling the tinted/untinted option.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>23</td>\n' +
      '<td width="50%"><img alt="Warhol Step 23" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2023.png" title="Warhol Step 23" width="100%"/></td>\n' +
      '<td>Arrange the images collected in <tt>photos</tt> into a grid with a 1-pixel white line between them.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>24</td>\n' +
      '<td width="50%"><img alt="Warhol Step 24" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2024.png" title="Warhol Step 24" width="100%"/></td>\n' +
      '<td>Save the grid image to Photos.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>25</td>\n' +
      '<td width="50%"><img alt="Warhol Step 25" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2025.png" title="Warhol Step 25" width="100%"/></td>\n' +
      '<td>If nothing was passed in, Warhol was run from Shortcuts…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>26</td>\n' +
      '<td width="50%"><img alt="Warhol Step 26" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2026.png" title="Warhol Step 26" width="100%"/></td>\n' +
      '<td>So open the Recents album in photos to see the newly made image.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>27</td>\n' +
      '<td width="50%"><img alt="Warhol Step 27" src="https://leancrew.com/all-this/images2020/20200810-Warhol%20Step%2027.png" title="Warhol Step 27" width="100%"/></td>\n' +
      '<td></td>\n' +
      '</tr>\n' +
      '</table>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/a-more-handy-warhol/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'After posting my Warhol shortcut, I got a couple of good suggestions for improvements. They overlapped to some extent, so I put them together into a new Warhol.\n' +
      'First, David Sparks pointed out that it would be helpful to end the shortcut by opening Photos so you can both see the new image and do something with it. And Leddy, in the Automators discussion forum, had a suggestion for running it both the Share Sheet and directly from Shortcuts without running into memory constraints. As I was trying out Leddy’s suggestion, I learned that Warhol wasn’t constrained by memory when run from the Share Sheet. (Apparently I’d run into that problem during one of the the early iterations of Warhol and never went back to check if the later improvements made it efficient enough to avoid the memory constraint.)\n' +
      'So now Warhol can be run from both Shortcuts and the Share Sheet in Photos. If it’s run from Shortcuts, it finishes by opening Photos. If it’s run from the Share Sheet, Photos is already open.\n' +
      'Here are the steps in the improved Warhol:\n' +
      'StepActionComment\n' +
      '0\n' +
      '\n' +
      'This would generally be run from the Share Sheet in Photos.\n' +
      '\n' +
      '\n' +
      '1\n' +
      '\n' +
      'This only works with one image, so if more than that selected, take just the first one.\n' +
      '\n' +
      '\n' +
      '2\n' +
      '\n' +
      'If this was really run from the Share Sheet, there will be something from the Step 1.\n' +
      '\n' +
      '\n' +
      '3\n' +
      '\n' +
      'So store that something in thePhoto for later use.\n' +
      '\n' +
      '\n' +
      '4\n' +
      '\n' +
      'If Warhol was run directly from Shortcuts, there’s no photo passed to it, and the output Step 1 is empty.\n' +
      '\n' +
      '\n' +
      '5\n' +
      '\n' +
      'So ask the user to select an image…\n' +
      '\n' +
      '\n' +
      '6\n' +
      '\n' +
      'And store that image in thePhoto.\n' +
      '\n' +
      '\n' +
      '7\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '8\n' +
      '\n' +
      'This is a dictionary of dictionaries, which we’ll use to resize the images and assemble the grid. The keys of the “outer” dictionary are the grid sizes you see in the left column. The keys of the “inner” dictionaries are count and width.\n' +
      '\n' +
      '\n' +
      '9\n' +
      '\n' +
      'Put up a menu for choosing the grid size from the dictionary in Step 8.\n' +
      '\n' +
      '\n' +
      '10\n' +
      '\n' +
      'Resize thePhoto to the width value from the dictionary item chosen in Step 9.\n' +
      '\n' +
      '\n' +
      '11\n' +
      '\n' +
      'Ask if the photos in the grid should be tinted.\n' +
      '\n' +
      '\n' +
      '12\n' +
      '\n' +
      'If yes…\n' +
      '\n' +
      '\n' +
      '13\n' +
      '\n' +
      'For the number of photos in the grid, which is the count value from the dictionary chosen in Step 9…\n' +
      '\n' +
      '\n' +
      '14\n' +
      '\n' +
      'Select an image at random from the Tints album.\n' +
      '\n' +
      '\n' +
      '15\n' +
      '\n' +
      'Resize the tint image and overlay it onto the resized version of thePhoto. Width and Height are the width and height of the resized photo. For the opacity of the overlay, I tried several values and landed on 40%. You may prefer something else.\n' +
      '\n' +
      '\n' +
      '16\n' +
      '\n' +
      'Add the tinted image to the photos list.\n' +
      '\n' +
      '\n' +
      '17\n' +
      '\n' +
      'We’re done assembling the tinted photos.\n' +
      '\n' +
      '\n' +
      '18\n' +
      '\n' +
      'If no tinting…\n' +
      '\n' +
      '\n' +
      '19\n' +
      '\n' +
      'For the number of photos in the grid, which is the count value from the dictionary chosen in Step 9…\n' +
      '\n' +
      '\n' +
      '20\n' +
      '\n' +
      'Add the resized version of thePhoto to the photos list.\n' +
      '\n' +
      '\n' +
      '21\n' +
      '\n' +
      'We’re done assembling the untinted photos.\n' +
      '\n' +
      '\n' +
      '22\n' +
      '\n' +
      'We’re done handling the tinted/untinted option.\n' +
      '\n' +
      '\n' +
      '23\n' +
      '\n' +
      'Arrange the images collected in photos into a grid with a 1-pixel white line between them.\n' +
      '\n' +
      '\n' +
      '24\n' +
      '\n' +
      'Save the grid image to Photos.\n' +
      '\n' +
      '\n' +
      '25\n' +
      '\n' +
      'If nothing was passed in, Warhol was run from Shortcuts…\n' +
      '\n' +
      '\n' +
      '26\n' +
      '\n' +
      'So open the Recents album in photos to see the newly made image.\n' +
      '\n' +
      '\n' +
      '27\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  After posting my <a href="https://leancrew.com/all-this/2020/08/development-shortcuts-and-warhol/">Warhol shortcut</a>, I got a couple of good suggestions for improvements. They overlapped to some extent, so I put them together into <a href="https://www.icloud.com/shortcuts/74ccef08af784e78abfe8a4448f8ae9b">a new Warhol</a>.\n',
    contentSnippet: 'After posting my Warhol shortcut, I got a couple of good suggestions for improvements. They overlapped to some extent, so I put them together into a new Warhol.',
    guid: 'https://leancrew.com/all-this/2020/08/a-more-handy-warhol/',
    isoDate: '2020-08-10T14:10:35.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'Phil Schiller',
    link: 'https://leancrew.com/all-this/2020/08/phil-schiller/',
    pubDate: 'Sun, 09 Aug 2020 16:48:21 +0000',
    'content:encoded': '\n' +
      '  <p>Although I won’t be terribly surprised if Phil Schiller appears onstage during this fall’s introduction of the new iPhones—those things get planned well in advance—it’s possible we’ve seen the last of his keynote presentations. I’m going to miss them for a couple of reasons.</p>\n' +
      '<p>First, Phil’s description of improvements in the iPhone’s camera never left me feeling shortchanged. Phil knew how important the camera was to iPhone users, and his own enthusiasm for iPhone photography always came through. He understood that people watching an Apple keynote have a high tolerance for detail on the topics that are important to them. In this, Phil was carrying on the tradition of Steve Jobs, who was more than happy to slow down a presentation and go into the details when he thought it was warranted. Look up Steve’s introduction of the iPad if you need to see an example of that.</p>\n' +
      '<p>Second, Phil is the last Apple presenter who is—how shall I put this?—not quite at his ideal weight. Just like me. How am I supposed to relate to Craig Federighi’s absurdly concave midsection?<sup id="fnref:hair"><a href="#fn:hair" rel="footnote">1</a></sup> If you’re a longtime Apple watcher, you’re probably now remembering the great Bob Mansfield. Those were the days.</p>\n' +
      '<div class="footnotes">\n' +
      '<hr/>\n' +
      '<ol>\n' +
      '<li id="fn:hair">\n' +
      '<p>Or his perfect hair, for that matter. <a href="#fnref:hair" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/phil-schiller/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'Although I won’t be terribly surprised if Phil Schiller appears onstage during this fall’s introduction of the new iPhones—those things get planned well in advance—it’s possible we’ve seen the last of his keynote presentations. I’m going to miss them for a couple of reasons.\n' +
      'First, Phil’s description of improvements in the iPhone’s camera never left me feeling shortchanged. Phil knew how important the camera was to iPhone users, and his own enthusiasm for iPhone photography always came through. He understood that people watching an Apple keynote have a high tolerance for detail on the topics that are important to them. In this, Phil was carrying on the tradition of Steve Jobs, who was more than happy to slow down a presentation and go into the details when he thought it was warranted. Look up Steve’s introduction of the iPad if you need to see an example of that.\n' +
      'Second, Phil is the last Apple presenter who is—how shall I put this?—not quite at his ideal weight. Just like me. How am I supposed to relate to Craig Federighi’s absurdly concave midsection?1 If you’re a longtime Apple watcher, you’re probably now remembering the great Bob Mansfield. Those were the days.\n' +
      'Or his perfect hair, for that matter. ↩\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  Although I won’t be terribly surprised if Phil Schiller appears onstage during this fall’s introduction of the new iPhones—those things get planned well in advance—it’s possible we’ve seen the last of his keynote presentations. I’m going to miss them for a couple of reasons.\n',
    contentSnippet: 'Although I won’t be terribly surprised if Phil Schiller appears onstage during this fall’s introduction of the new iPhones—those things get planned well in advance—it’s possible we’ve seen the last of his keynote presentations. I’m going to miss them for a couple of reasons.',
    guid: 'https://leancrew.com/all-this/2020/08/phil-schiller/',
    isoDate: '2020-08-09T16:48:21.000Z'
  },
  {
    creator: '\n  Dr. Drang\n',
    title: 'Development, Shortcuts, and Warhol',
    link: 'https://leancrew.com/all-this/2020/08/development-shortcuts-and-warhol/',
    pubDate: 'Fri, 07 Aug 2020 14:28:01 +0000',
    'content:encoded': '\n' +
      '  <p>For the past several days, I’ve been annoying my family with a shortcut. If there are people in your life you want to annoy, you might want to use it. And apart from the annoyance value, it has some Shortcuts programming techniques that I want to memorialize for future use.</p>\n' +
      '<p>My daughter has a dog named Daisy, and on a per-kilobyte basis, she is the biggest topic of conversation in the family texts. There are lots of texts about Daisy, and most of them are photos of her. Even so, there’s never enough Daisy, so I wrote a shortcut to amplify the Daisy content. It takes a single picture of Daisy,</p>\n' +
      '<p><img alt="Daisy single" class="ss" src="https://leancrew.com/all-this/images2020/20200804-Daisy%20single.jpg" title="Daisy single" width="50%"/></p>\n' +
      '<p>and makes a grid (or <em>small multiple</em>, as Tufte would have it) of Daisys.</p>\n' +
      '<p><img alt="Untinted Daisy" class="ss" src="https://leancrew.com/all-this/images2020/20200804-Untinted%20Daisy.jpg" title="Untinted Daisy" width="80%"/></p>\n' +
      '<p>As an option, I can apply a random tint to the component images.</p>\n' +
      '<p><img alt="Tinted Daisy" class="ss" src="https://leancrew.com/all-this/images2020/20200804-Tinted%20Daisy.jpg" title="Tinted Daisy" width="80%"/></p>\n' +
      '<p>I’ve called this shortcut <span class="menu">Warhol</span> for what should be <a href="https://www.artetrama.com/blogs/news/about-andy-warhols-sunday-b-morning-marilyn-monroe-series">obvious reasons</a>.</p>\n' +
      '<p>Using the shortcut is simple. Upon launching Warhol, you’re asked to choose an image from Photos.<sup id="fnref:share"><a href="#fn:share" rel="footnote">1</a></sup> When that’s done, you’re asked to choose the grid size:</p>\n' +
      '<p><img alt="Choosing grid size" class="ss" src="https://leancrew.com/all-this/images2020/20200804-Choosing%20grid%20size.png" title="Choosing grid size" width="50%"/></p>\n' +
      '<p>Finally, you’re asked if you want the images tinted or not.</p>\n' +
      '<p>You can <a href="https://www.icloud.com/shortcuts/c7d2a77c999349608e6b4e0c4fc2b6e3">download the shortcut</a> and install it. As we’ll see in the description, Warhol does require a bit of external setup: a Photos album named Tints that contains 1×1 PNG images of a single color. Here’s what my Tints album looks like:</p>\n' +
      '<p><img alt="Tints album" class="ss" src="https://leancrew.com/all-this/images2020/20200806-Tints%20album.jpg" title="Tints album" width="50%"/></p>\n' +
      '<p>You can <a href="https://leancrew.com/all-this/downloads/Tints.zip">download this zip file</a> of my tints, but don’t feel restricted to these colors. Warhol will work with whatever you put in the Tints album. The only restriction—unless you change the Warhol source code—is that the album must be named Tints.</p>\n' +
      '<p>Here are the steps of Warhol:</p>\n' +
      '<table width="100%">\n' +
      '<tr><th>Step</th><th>Action</th><th>Comment</th></tr>\n' +
      '<tr>\n' +
      '<td>1</td>\n' +
      '<td width="50%"><img alt="Warhol Step 01" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2001.png" title="Warhol Step 01" width="100%"/></td>\n' +
      '<td>Put up the usual Shortcuts photo picker. You’re allowed to choose only one.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '</tr><tr>\n' +
      '<td>2</td>\n' +
      '<td width="50%"><img alt="Warhol Step 02" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2002.png" title="Warhol Step 02" width="100%"/></td>\n' +
      '<td>This is a dictionary of dictionaries, which we’ll use to resize the images and assemble the grid. The keys of the “outer” dictionary are the grid sizes you see in the left column. The keys of the “inner” dictionaries are <tt>count</tt> and <tt>width</tt>. A table of values and an explanation of how the values were determined is below.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>3</td>\n' +
      '<td width="50%"><img alt="Warhol Step 03" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2003.png" title="Warhol Step 03" width="100%"/></td>\n' +
      '<td>Put up a menu for choosing the grid size from the dictionary in Step 2.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>4</td>\n' +
      '<td width="50%"><img alt="Warhol Step 04" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2004.png" title="Warhol Step 04" width="100%"/></td>\n' +
      '<td>Resize the photo chosen in Step 1 to the <tt>width</tt> value from the dictionary item chosen in Step 3.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>5</td>\n' +
      '<td width="50%"><img alt="Warhol Step 05" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2005.png" title="Warhol Step 05" width="100%"/></td>\n' +
      '<td>Ask if the photos in the grid should be tinted.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>6</td>\n' +
      '<td width="50%"><img alt="Warhol Step 06" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2006.png" title="Warhol Step 06" width="100%"/></td>\n' +
      '<td>If yes…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>7</td>\n' +
      '<td width="50%"><img alt="Warhol Step 07" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2007.png" title="Warhol Step 07" width="100%"/></td>\n' +
      '<td>For the number of photos in the grid, which is the <tt>count</tt> value from the dictionary chosen in Step 3…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>8</td>\n' +
      '<td width="50%"><img alt="Warhol Step 08" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2008.png" title="Warhol Step 08" width="100%"/></td>\n' +
      '<td>Select an image at random from the Tints album.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>9</td>\n' +
      '<td width="50%"><img alt="Warhol Step 09" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2009.png" title="Warhol Step 09" width="100%"/></td>\n' +
      '<td>Resize the tint image and overlay it onto the photo selected in Step 1 and resized in Step 4. <tt>Width</tt> and <tt>Height</tt> are the width and height of the resized photo. For the opacity of the overlay, I tried several values and landed on 40%. You may prefer something else.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>10</td>\n' +
      '<td width="50%"><img alt="Warhol Step 10" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2010.png" title="Warhol Step 10" width="100%"/></td>\n' +
      '<td>Add the tinted image to the <tt>photos</tt> list.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>11</td>\n' +
      '<td width="50%"><img alt="Warhol Step 11" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2011.png" title="Warhol Step 11" width="100%"/></td>\n' +
      '<td>We’re done assembling the tinted photos.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>12</td>\n' +
      '<td width="50%"><img alt="Warhol Step 12" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2012.png" title="Warhol Step 12" width="100%"/></td>\n' +
      '<td>If no tinting…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>13</td>\n' +
      '<td width="50%"><img alt="Warhol Step 13" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2013.png" title="Warhol Step 13" width="100%"/></td>\n' +
      '<td>For the number of photos in the grid, which is the <tt>count</tt> value from the dictionary chosen in Step 3…</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>14</td>\n' +
      '<td width="50%"><img alt="Warhol Step 14" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2014.png" title="Warhol Step 14" width="100%"/></td>\n' +
      '<td>Add the photo selected in Step 1 and resized in Step 4 to the <tt>photos</tt> list.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>15</td>\n' +
      '<td width="50%"><img alt="Warhol Step 15" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2015.png" title="Warhol Step 15" width="100%"/></td>\n' +
      '<td>We’re done assembling the untinted photos.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>16</td>\n' +
      '<td width="50%"><img alt="Warhol Step 16" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2016.png" title="Warhol Step 16" width="100%"/></td>\n' +
      '<td>We’re done handling the tinted/untinted option.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>17</td>\n' +
      '<td width="50%"><img alt="Warhol Step 17" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2017.png" title="Warhol Step 17" width="100%"/></td>\n' +
      '<td>Arrange the images collected in <tt>photos</tt> into a grid with a 1-pixel white line between them.</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td>18</td>\n' +
      '<td width="50%"><img alt="Warhol Step 18" src="https://leancrew.com/all-this/images2020/20200807-Warhol%20Step%2018.png" title="Warhol Step 18" width="100%"/></td>\n' +
      '<td>Save the grid image to Photos.</td>\n' +
      '</tr>\n' +
      '</table>\n' +
      '<p>The dictionary of dictionaries defined in Step 2 contains these values:</p>\n' +
      '<table>\n' +
      '<thead>\n' +
      '<tr>\n' +
      '<th align="center">grid</th>\n' +
      '<th align="right">count</th>\n' +
      '<th align="right">width</th>\n' +
      '</tr>\n' +
      '</thead>\n' +
      '<tbody>\n' +
      '<tr>\n' +
      '<td align="center">2x2</td>\n' +
      '<td align="right">4</td>\n' +
      '<td align="right">1920</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td align="center">3x3</td>\n' +
      '<td align="right">9</td>\n' +
      '<td align="right">1280</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td align="center">4x4</td>\n' +
      '<td align="right">16</td>\n' +
      '<td align="right">960</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td align="center">5x5</td>\n' +
      '<td align="right">25</td>\n' +
      '<td align="right">768</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td align="center">6x6</td>\n' +
      '<td align="right">36</td>\n' +
      '<td align="right">640</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td align="center">8x8</td>\n' +
      '<td align="right">64</td>\n' +
      '<td align="right">480</td>\n' +
      '</tr>\n' +
      '<tr>\n' +
      '<td align="center">10x10</td>\n' +
      '<td align="right">100</td>\n' +
      '<td align="right">384</td>\n' +
      '</tr>\n' +
      '</tbody>\n' +
      '</table>\n' +
      '<p>The numerical trick in choosing the sizes is to come up with a multiple of 2, 3, 4, 5, 6, 8, and 10 that is the width you want for the final image (ignoring the 1-pixel separator lines). This will have to be a multiple of 120, which is the least common multiple of those numbers. I chose a final image size of 3840, which I sometimes think is too large, but I do like to zoom in on the individual images and still have decent detail. If you don’t want to use storage space and bandwidth as profligately as I do, choose a smaller multiple of 120 (1200? 2400?) and divide that by 2, 3, 4, 5, 6, 8, and 10 to get the <code>width</code>s.</p>\n' +
      '<p>It’s not obvious how to use a variable as the repetition count in a Repeat loop, as is done in Steps 7 and 13. When you first add a Repeat step, you’re given a count that you can change by tapping the plus or minus buttons that appear when you touch the count button.</p>\n' +
      '<p><img alt="Repeat action" class="ss" src="https://leancrew.com/all-this/images2020/20200804-Repeat%20action.jpg" title="Repeat action" width="50%"/></p>\n' +
      '<p>To use a variable for the count instead of a predefined number, you have to <em>press and hold</em> on the count button. A menu like this will appear,</p>\n' +
      '<p><img alt="Variable repetition menu" class="ss" src="https://leancrew.com/all-this/images2020/20200806-Variable%20repetition%20menu.png" title="Variable repetition menu" width="50%"/></p>\n' +
      '<p>and you’ll be able to choose either a regular variable or a magic variable for the number of repetitions. This is a terrible, undiscoverable design decision. And even after I did discover it (through Googling), I was disappointed to see that the step reads “Repeat count” instead of “Repeat count times.”</p>\n' +
      '<p>You may be wondering where the <code>photos</code> variable in Steps 10 and 14 came from. Basically, it gets made up on the spot and accumulates additional values in a list with each pass through the loop. Here’s the description of <span class="menu">Add to Variable</span>:</p>\n' +
      '<blockquote>\n' +
      '<p>Appends this action’s input to the specified variable, creating the variable if it does not exist.</p>\n' +
      '<p>This allows you to make a variable hold multiple items.</p>\n' +
      '</blockquote>\n' +
      '<p>If you’re used to writing in stricter languages, it may bother you that you don’t have to initialize <code>photos</code> with an empty list before adding values to it. If you’ve programmed in Perl, you’ll probably feel right at home.</p>\n' +
      '<p>I often feel guilty about presenting a completed automation, one that I’ve spent a lot of time writing and rewriting to make clearer, more efficient, and more idiomatic to the language in which it’s written. I can assure you that even a silly program like Warhol didn’t spring out fully formed, like Athena from Zeus’s head. It started out both much simpler, in that it handled fewer grid sizes and couldn’t tint the images, and more complicated, in that it didn’t take advantage of some of the niceties of Shortcuts.</p>\n' +
      '<p>For example, the earliest versions of Warhol presented only a few grid sizes and used a repetitive <span class="menu">Choose from Menu</span> section to set the size of the list of images. It was only after I had the basic logic of the shortcut worked out that I switched to using the dictionary of dictionaries to handle the different grid sizes. That change cleaned up a lot of code.</p>\n' +
      '<p>The earlier versions of Warhol also had no logic for resizing the base image before assembling it into a list of images. The <span class="menu">Resize Image</span> step came at the end, only after <span class="menu">Combine Images</span> had created a truly enormous grid image, usually well over 10,000 pixels wide. These early versions often ran <em>very</em> slowly because of all the data they were slinging around.</p>\n' +
      '<p>I don’t consider any of these inefficiencies in code size or running time to be bugs. They were part of my normal process of development:</p>\n' +
      '<ol>\n' +
      '<li>Order my thoughts to understand what the problem is and how to solve it.</li>\n' +
      '<li>Work out some code that implements that solution.</li>\n' +
      '<li>Improve the code to make it tighter, easier to understand, and, if necessary, faster.</li>\n' +
      '</ol>\n' +
      '<p>Steps 2 and 3 usually lead to revisions in what I came up with in Step 1. Working out a solution almost always gives me a better understanding of what the problem really is.</p>\n' +
      '<p>Ultimately, Warhol is a solution in search of a problem. It’s the kind of automation I create because I think writing it would be fun and I would learn something in the process. On those terms, it was a success.</p>\n' +
      '<div class="footnotes">\n' +
      '<hr/>\n' +
      '<ol>\n' +
      '<li id="fn:share">\n' +
      '<p>Normally, I’d have a shortcut like this set up to run in the Share Sheet, but memory restrictions don’t allow that. <a href="#fnref:share" rev="footnote">↩</a></p>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</div>\n' +
      '<br />\n' +
      '<p>[If the formatting of equations looks odd in your feed reader, <a href="https://leancrew.com/all-this/2020/08/development-shortcuts-and-warhol/">visit the original article</a>]</p>\n',
    'content:encodedSnippet': 'For the past several days, I’ve been annoying my family with a shortcut. If there are people in your life you want to annoy, you might want to use it. And apart from the annoyance value, it has some Shortcuts programming techniques that I want to memorialize for future use.\n' +
      'My daughter has a dog named Daisy, and on a per-kilobyte basis, she is the biggest topic of conversation in the family texts. There are lots of texts about Daisy, and most of them are photos of her. Even so, there’s never enough Daisy, so I wrote a shortcut to amplify the Daisy content. It takes a single picture of Daisy,\n' +
      '\n' +
      'and makes a grid (or small multiple, as Tufte would have it) of Daisys.\n' +
      '\n' +
      'As an option, I can apply a random tint to the component images.\n' +
      '\n' +
      'I’ve called this shortcut Warhol for what should be obvious reasons.\n' +
      'Using the shortcut is simple. Upon launching Warhol, you’re asked to choose an image from Photos.1 When that’s done, you’re asked to choose the grid size:\n' +
      '\n' +
      'Finally, you’re asked if you want the images tinted or not.\n' +
      'You can download the shortcut and install it. As we’ll see in the description, Warhol does require a bit of external setup: a Photos album named Tints that contains 1×1 PNG images of a single color. Here’s what my Tints album looks like:\n' +
      '\n' +
      'You can download this zip file of my tints, but don’t feel restricted to these colors. Warhol will work with whatever you put in the Tints album. The only restriction—unless you change the Warhol source code—is that the album must be named Tints.\n' +
      'Here are the steps of Warhol:\n' +
      'StepActionComment\n' +
      '1\n' +
      '\n' +
      'Put up the usual Shortcuts photo picker. You’re allowed to choose only one.\n' +
      '\n' +
      '\n' +
      '\n' +
      '2\n' +
      '\n' +
      'This is a dictionary of dictionaries, which we’ll use to resize the images and assemble the grid. The keys of the “outer” dictionary are the grid sizes you see in the left column. The keys of the “inner” dictionaries are count and width. A table of values and an explanation of how the values were determined is below.\n' +
      '\n' +
      '\n' +
      '3\n' +
      '\n' +
      'Put up a menu for choosing the grid size from the dictionary in Step 2.\n' +
      '\n' +
      '\n' +
      '4\n' +
      '\n' +
      'Resize the photo chosen in Step 1 to the width value from the dictionary item chosen in Step 3.\n' +
      '\n' +
      '\n' +
      '5\n' +
      '\n' +
      'Ask if the photos in the grid should be tinted.\n' +
      '\n' +
      '\n' +
      '6\n' +
      '\n' +
      'If yes…\n' +
      '\n' +
      '\n' +
      '7\n' +
      '\n' +
      'For the number of photos in the grid, which is the count value from the dictionary chosen in Step 3…\n' +
      '\n' +
      '\n' +
      '8\n' +
      '\n' +
      'Select an image at random from the Tints album.\n' +
      '\n' +
      '\n' +
      '9\n' +
      '\n' +
      'Resize the tint image and overlay it onto the photo selected in Step 1 and resized in Step 4. Width and Height are the width and height of the resized photo. For the opacity of the overlay, I tried several values and landed on 40%. You may prefer something else.\n' +
      '\n' +
      '\n' +
      '10\n' +
      '\n' +
      'Add the tinted image to the photos list.\n' +
      '\n' +
      '\n' +
      '11\n' +
      '\n' +
      'We’re done assembling the tinted photos.\n' +
      '\n' +
      '\n' +
      '12\n' +
      '\n' +
      'If no tinting…\n' +
      '\n' +
      '\n' +
      '13\n' +
      '\n' +
      'For the number of photos in the grid, which is the count value from the dictionary chosen in Step 3…\n' +
      '\n' +
      '\n' +
      '14\n' +
      '\n' +
      'Add the photo selected in Step 1 and resized in Step 4 to the photos list.\n' +
      '\n' +
      '\n' +
      '15\n' +
      '\n' +
      'We’re done assembling the untinted photos.\n' +
      '\n' +
      '\n' +
      '16\n' +
      '\n' +
      'We’re done handling the tinted/untinted option.\n' +
      '\n' +
      '\n' +
      '17\n' +
      '\n' +
      'Arrange the images collected in photos into a grid with a 1-pixel white line between them.\n' +
      '\n' +
      '\n' +
      '18\n' +
      '\n' +
      'Save the grid image to Photos.\n' +
      '\n' +
      '\n' +
      'The dictionary of dictionaries defined in Step 2 contains these values:\n' +
      'grid\n' +
      'count\n' +
      'width\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '2x2\n' +
      '4\n' +
      '1920\n' +
      '\n' +
      '\n' +
      '3x3\n' +
      '9\n' +
      '1280\n' +
      '\n' +
      '\n' +
      '4x4\n' +
      '16\n' +
      '960\n' +
      '\n' +
      '\n' +
      '5x5\n' +
      '25\n' +
      '768\n' +
      '\n' +
      '\n' +
      '6x6\n' +
      '36\n' +
      '640\n' +
      '\n' +
      '\n' +
      '8x8\n' +
      '64\n' +
      '480\n' +
      '\n' +
      '\n' +
      '10x10\n' +
      '100\n' +
      '384\n' +
      '\n' +
      '\n' +
      '\n' +
      'The numerical trick in choosing the sizes is to come up with a multiple of 2, 3, 4, 5, 6, 8, and 10 that is the width you want for the final image (ignoring the 1-pixel separator lines). This will have to be a multiple of 120, which is the least common multiple of those numbers. I chose a final image size of 3840, which I sometimes think is too large, but I do like to zoom in on the individual images and still have decent detail. If you don’t want to use storage space and bandwidth as profligately as I do, choose a smaller multiple of 120 (1200? 2400?) and divide that by 2, 3, 4, 5, 6, 8, and 10 to get the widths.\n' +
      'It’s not obvious how to use a variable as the repetition count in a Repeat loop, as is done in Steps 7 and 13. When you first add a Repeat step, you’re given a count that you can change by tapping the plus or minus buttons that appear when you touch the count button.\n' +
      '\n' +
      'To use a variable for the count instead of a predefined number, you have to press and hold on the count button. A menu like this will appear,\n' +
      '\n' +
      'and you’ll be able to choose either a regular variable or a magic variable for the number of repetitions. This is a terrible, undiscoverable design decision. And even after I did discover it (through Googling), I was disappointed to see that the step reads “Repeat count” instead of “Repeat count times.”\n' +
      'You may be wondering where the photos variable in Steps 10 and 14 came from. Basically, it gets made up on the spot and accumulates additional values in a list with each pass through the loop. Here’s the description of Add to Variable:\n' +
      'Appends this action’s input to the specified variable, creating the variable if it does not exist.\n' +
      'This allows you to make a variable hold multiple items.\n' +
      'If you’re used to writing in stricter languages, it may bother you that you don’t have to initialize photos with an empty list before adding values to it. If you’ve programmed in Perl, you’ll probably feel right at home.\n' +
      'I often feel guilty about presenting a completed automation, one that I’ve spent a lot of time writing and rewriting to make clearer, more efficient, and more idiomatic to the language in which it’s written. I can assure you that even a silly program like Warhol didn’t spring out fully formed, like Athena from Zeus’s head. It started out both much simpler, in that it handled fewer grid sizes and couldn’t tint the images, and more complicated, in that it didn’t take advantage of some of the niceties of Shortcuts.\n' +
      'For example, the earliest versions of Warhol presented only a few grid sizes and used a repetitive Choose from Menu section to set the size of the list of images. It was only after I had the basic logic of the shortcut worked out that I switched to using the dictionary of dictionaries to handle the different grid sizes. That change cleaned up a lot of code.\n' +
      'The earlier versions of Warhol also had no logic for resizing the base image before assembling it into a list of images. The Resize Image step came at the end, only after Combine Images had created a truly enormous grid image, usually well over 10,000 pixels wide. These early versions often ran very slowly because of all the data they were slinging around.\n' +
      'I don’t consider any of these inefficiencies in code size or running time to be bugs. They were part of my normal process of development:\n' +
      'Order my thoughts to understand what the problem is and how to solve it.\n' +
      'Work out some code that implements that solution.\n' +
      'Improve the code to make it tighter, easier to understand, and, if necessary, faster.\n' +
      'Steps 2 and 3 usually lead to revisions in what I came up with in Step 1. Working out a solution almost always gives me a better understanding of what the problem really is.\n' +
      'Ultimately, Warhol is a solution in search of a problem. It’s the kind of automation I create because I think writing it would be fun and I would learn something in the process. On those terms, it was a success.\n' +
      'Normally, I’d have a shortcut like this set up to run in the Share Sheet, but memory restrictions don’t allow that. ↩\n' +
      '[If the formatting of equations looks odd in your feed reader, visit the original article]',
    'dc:creator': '\n  Dr. Drang\n',
    content: '\n' +
      '  For the past several days, I’ve been annoying my family with a shortcut. If there are people in your life you want to annoy, you might want to use it. And apart from the annoyance value, it has some Shortcuts programming techniques that I want to memorialize for future use.\n',
    contentSnippet: 'For the past several days, I’ve been annoying my family with a shortcut. If there are people in your life you want to annoy, you might want to use it. And apart from the annoyance value, it has some Shortcuts programming techniques that I want to memorialize for future use.',
    guid: 'https://leancrew.com/all-this/2020/08/development-shortcuts-and-warhol/',
    isoDate: '2020-08-07T14:28:01.000Z'
  }
]
{ exit: true } SIGINT
SIGINT
{ cleanup: true } 0
clean
0
Closed
